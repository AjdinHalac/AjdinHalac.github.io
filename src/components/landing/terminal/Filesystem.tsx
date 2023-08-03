interface UnixFile {
  name: string;
  content: string;
}

interface Directory {
  name: string;
  files: UnixFile[];
  subdirectories: Directory[];
}

export class UnixFileSystem {
  private root: Directory;
  private currentDirectory: Directory;

  constructor() {
    this.root = { name: "/", files: [], subdirectories: [] };
    this.currentDirectory = this.root;
  }

  public get getCurrentDirectory(): string {
    return this.currentDirectory.name;
  }

  private findDirectory(path: string): Directory | null {
    const directories = path.split("/").filter((part) => part !== "");

    let currentDir = this.root;
    for (const dir of directories) {
      const foundDir = currentDir.subdirectories.find((subdir) => subdir.name === dir);
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

    const dir = this.findDirectory(directoriesAndFile.join("/"));
    if (!dir) {
      return null;
    }

    return dir.files.find((file) => file.name === fileName) || null;
  }

  public cd(path: string): string {
    if (path === "..") {
      if (this.currentDirectory === this.root) {
        return "Error: Already at the root directory";
      }
      this.currentDirectory = this.findDirectory("..") || this.root;
    } else {
      const targetDir = this.findDirectory(path);
      if (targetDir) {
        this.currentDirectory = targetDir;
      } else {
        return `Error: Directory "${path}" not found`;
      }
    }

    return "";
  }

  public pwd(): string {
    const pathParts: string[] = [];
    let currentDir = this.currentDirectory;

    while (currentDir !== this.root) {
      pathParts.unshift(currentDir.name);
      currentDir = this.findDirectory("..") || this.root;
    }

    return "/" + pathParts.join("/");
  }

  public ls(): string[] {
    const files = this.currentDirectory.files.map((file) => file.name);
    const directories = this.currentDirectory.subdirectories.map(
      (dir) => dir.name
    );
    return [...files, ...directories];
  }

  public mkdir(name: string): string {
    if (this.currentDirectory.subdirectories.some((dir) => dir.name === name)) {
      return `Error: Directory "${name}" already exists`;
    }

    this.currentDirectory.subdirectories.push({
      name,
      files: [],
      subdirectories: [],
    });
    return "";
  }

  public touch(name: string, content: string = ""): string {
    if (this.currentDirectory.files.some((file) => file.name === name)) {
      return `Error: File "${name}" already exists`;
    }

    this.currentDirectory.files.push({ name, content: content });
    return "";
  }

  public cat(path: string): string {
    const file = this.findUnixFile(path);
    if (file) {
      return file.content;
    } else {
      return `Error: File "${path}" not found`;
    }
  }

  public rm(path: string): string {
    const file = this.findUnixFile(path);
    if (file) {
      this.currentDirectory.files = this.currentDirectory.files.filter(
        (f) => f.name !== file.name
      );
      return "";
    }

    const directory = this.findDirectory(path);
    if (directory) {
      this.currentDirectory.subdirectories =
        this.currentDirectory.subdirectories.filter(
          (dir) => dir.name !== directory.name
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
          (f) => f.name !== file.name
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
            (dir) => dir.name !== directory.name
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
