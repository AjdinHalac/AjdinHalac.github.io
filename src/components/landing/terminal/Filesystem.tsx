interface UnixFile {
  name: string;
  path: string;
  content: string;
}

interface Directory {
  name: string;
  path: string;
  files: UnixFile[];
  subdirectories: Directory[];
}

export class UnixFileSystem {
  private root: Directory;
  private currentDirectory: Directory;

  constructor() {
    this.root = { name: "/", path: "/", files: [], subdirectories: [] };
    this.currentDirectory = this.root;
  }

  public get getCurrentDirectory(): string {
    return this.currentDirectory.name;
  }

  private findDirectory(path: string): Directory | null {
    let directories: string[];
    if (path === "..") {
      directories = this.currentDirectory.path
        .split("/")
        .filter((part) => part !== "");
      directories.pop();
    } else {
      directories = path.split("/").filter((part) => part !== "");
    }

    let currentDir = this.root;
    for (const dir of directories) {
      const foundDir = currentDir.subdirectories.find(
        (subdir) => subdir.name === dir,
      );
      if (foundDir) {
        currentDir = foundDir;
      } else {
        return null; // Directory not found
      }
    }

    return currentDir;
  }

  private findUnixFile(path: string): UnixFile | null {
    const directoriesAndFile = path.split("/").filter((part) => part !== "");
    const fileName = directoriesAndFile.pop();
    if (!fileName) {
      return null;
    }

    let dir = this.findDirectory(directoriesAndFile.join("/"));
    if (!dir) {
      return null;
    } else {
      dir = this.currentDirectory;
    }

    return dir.files.find((file) => file.name === fileName) || null;
  }

  public cd(path: string): string {
    // Handle empty, undefined, or ~ → go to root
    if (!path || path === "" || path === "~") {
      this.currentDirectory = this.root;
      return "";
    }

    if (path === "..") {
      if (this.currentDirectory === this.root) {
        return "Error: Already at the root directory";
      }
      this.currentDirectory = this.findDirectory("..") || this.root;
      return "";
    }

    let targetDir: Directory | undefined | null;
    if (path.startsWith("/")) {
      targetDir = this.findDirectory(path);
    } else {
      targetDir = this.currentDirectory.subdirectories.find(
        (subdir) => subdir.name === path,
      );
    }

    if (targetDir) {
      this.currentDirectory = targetDir;
    } else {
      return `Error: Directory "${path}" not found`;
    }

    return "";
  }

  public pwd(): string {
    return this.currentDirectory.path;
  }

  public ls(path: string): string[] {
    let targetDir: Directory | null | undefined;
    if (!path || path === "") {
      targetDir = this.currentDirectory;
    } else {
      if (path.startsWith("/") || path.startsWith("..")) {
        targetDir = this.findDirectory(path);
      } else {
        targetDir = this.currentDirectory.subdirectories.find(
          (dir) => dir.name === path,
        );
      }
    }

    if (!targetDir) {
      return [`Error: Path to directory "${path}" not found`];
    }

    const files = targetDir.files.map((file) => file.name);
    const directories = targetDir.subdirectories.map((dir) => dir.name);
    return [...files, ...directories];
  }

  public mkdir(path: string): string {
    if (!path || path === "") {
      return `Error: Directory name must be provided`;
    }

    let targetDir: Directory | null;
    let name: string | undefined;
    if (path.startsWith("/") || path.startsWith("..")) {
      const directoriesAndFile = path.split("/").filter((part) => part !== "");
      name = directoriesAndFile.pop();
      if (!name) {
        return `Error: File name must be provided`;
      }

      targetDir = this.findDirectory(directoriesAndFile.join("/"));
    } else {
      name = path;
      targetDir = this.currentDirectory;
    }

    if (targetDir === null) {
      return `Error: Path to directory "${path}" not found`;
    }

    if (targetDir.subdirectories.some((dir) => dir.name === name)) {
      return `Error: Directory "${path}" already exists`;
    }

    targetDir.subdirectories.push({
      name: name,
      path: targetDir.path + name + "/",
      files: [],
      subdirectories: [],
    });
    return "";
  }

  public touch(path: string, content: string = ""): string {
    if (!path || path === "") {
      return `Error: File name must be provided`;
    }

    let targetDir: Directory | null;
    let name: string | undefined;
    if (path.startsWith("/") || path.startsWith("..")) {
      const directoriesAndFile = path.split("/").filter((part) => part !== "");
      name = directoriesAndFile.pop();
      if (!name) {
        return `Error: File name must be provided`;
      }

      targetDir = this.findDirectory(directoriesAndFile.join("/"));
    } else {
      name = path;
      targetDir = this.currentDirectory;
    }

    if (targetDir === null) {
      return `Error: Path to directory "${path}" not found`;
    }

    if (targetDir.files.some((file) => file.name === name)) {
      return `Error: File "${path}" already exists`;
    }

    targetDir.files.push({
      name: name,
      path: targetDir.path + name + "/",
      content: content,
    });
    return "";
  }

  public cat(path: string): string {
    if (!path || path === "") {
      return `Error: File name must be provided`;
    }

    let targetDir: Directory | null;
    let name: string | undefined;
    if (path.startsWith("/") || path.startsWith("..")) {
      const directoriesAndFile = path.split("/").filter((part) => part !== "");
      name = directoriesAndFile.pop();
      if (!name) {
        return `Error: File name must be provided`;
      }

      targetDir = this.findDirectory(directoriesAndFile.join("/"));
    } else {
      name = path;
      targetDir = this.currentDirectory;
    }

    if (targetDir === null) {
      return `Error: Path to file "${path}" not found`;
    }

    let targetFile = targetDir.files.find((file) => file.name === name);
    if (targetFile) {
      return targetFile.content;
    }

    return `Error: File "${path}" not found`;
  }

  public rm(path: string): string {
    const file = this.findUnixFile(path);
    if (file) {
      this.currentDirectory.files = this.currentDirectory.files.filter(
        (f) => f.name !== file.name,
      );
      return "";
    }

    const directory = this.findDirectory(path);
    if (directory) {
      this.currentDirectory.subdirectories =
        this.currentDirectory.subdirectories.filter(
          (dir) => dir.name !== directory.name,
        );
      return "";
    }

    return `Error: Path "${path}" not found`;
  }

  public mv(oldPath: string, newPath: string): string {
    const file = this.findUnixFile(oldPath);
    const directory = this.findDirectory(oldPath);

    if (file) {
      const newUnixFile = this.findUnixFile(newPath);
      if (newUnixFile) {
        return `Error: File "${newPath}" already exists`;
      }

      file.name = newPath.split("/").pop() || file.name;
      const targetDir = this.findDirectory(newPath);
      if (targetDir) {
        targetDir.files.push(file);
        this.currentDirectory.files = this.currentDirectory.files.filter(
          (f) => f.name !== file.name,
        );
      } else {
        return `Error: Directory "${newPath}" not found`;
      }
    } else if (directory) {
      const newDir = this.findDirectory(newPath);
      if (newDir) {
        return `Error: Directory "${newPath}" already exists`;
      }

      directory.name = newPath.split("/").pop() || directory.name;
      const targetDir = this.findDirectory(newPath);
      if (targetDir) {
        targetDir.subdirectories.push(directory);
        this.currentDirectory.subdirectories =
          this.currentDirectory.subdirectories.filter(
            (dir) => dir.name !== directory.name,
          );
      } else {
        return `Error: Directory "${newPath}" not found`;
      }
    } else {
      return `Error: Path "${oldPath}" not found`;
    }

    return "";
  }
}
