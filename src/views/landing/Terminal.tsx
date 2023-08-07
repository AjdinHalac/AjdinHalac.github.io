import { Box, Container, Divider, HStack, Stack, Text } from "@chakra-ui/react";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import Help from "../../components/landing/terminal/commands/Help";
import Echo from "../../components/landing/terminal/commands/Echo";
import Social from "../../components/landing/terminal/commands/Social";
import Connect from "../../components/landing/terminal/commands/Connect";
import HistoryItems from "../../components/landing/terminal/HistoryItems";
import Path from "../../components/landing/terminal/Path";
import CommandInput from "../../components/landing/terminal/CommandInput";
import { cookieService } from "../../services/CookieService";
import ApiCalls from "../../domain/common/api/ApiCalls";
import { UnixFileSystem } from "../../components/landing/terminal/Filesystem";
import Submit from "../../components/landing/terminal/commands/Submit";

const Terminal = (): ReactElement => {
  const triggered = useRef<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [commandsHistory, setCommandsHistory] = useState<string[]>([]);

  const [user, setUser] = useState("");
  const [fileSystem, setFileSystem] = useState<UnixFileSystem>(
    new UnixFileSystem()
  );

  const getUser = async () => {
    if (!triggered.current) {
      if (cookieService.isAuthenticated()) {
        const user = await ApiCalls.getMe();
        setUser(user.data.email.split("@")[0]);
      } else {
        setUser("Anon");
      }
      triggered.current = true;
    }
  };

  useEffect(() => {
    getUser();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (triggered.current) {
      fileSystem.mkdir("bin");
      fileSystem.mkdir("boot");
      fileSystem.mkdir("dev");
      fileSystem.mkdir("etc");
      fileSystem.mkdir("lib");
      fileSystem.mkdir("tmp");
      fileSystem.mkdir("mnt");
      fileSystem.mkdir("usr");
      fileSystem.mkdir("home");
      fileSystem.mkdir("/home/ahalac");
      fileSystem.touch(
        "/home/ahalac/help.txt",
        "Flag might not be within the terminal, have you tried console?"
      );
      fileSystem.mkdir("/home/" + user);
      fileSystem.cd("/home/" + user);
    }
  }, [user, triggered]);

  const processInputString = (command: string): string[] => {
    let input = command.split(" ");

    if (input.length > 3) {
      const cmd = input.splice(0, 2);

      const args = input.join(" ");
      return (input = [...cmd, args]);
    }

    return [...input];
  };

  const renderTerminalResponse = (command: string) => {
    const [key, argument, argumentAnother] = processInputString(command);

    switch (key.toLowerCase()) {
      case "help":
        return <Help />;

      case "clear":
        setCommandsHistory([]);
        break;

      case "whoami":
        return <Echo message={user} />;

      case "echo":
        return <Echo message={argument} />;

      case "social":
        return <Social />;

      case "connect":
        return <Connect social={argument} />;

      case "cd":
        return <Echo message={fileSystem.cd(argument)} />;

      case "pwd":
        return <Echo message={fileSystem.pwd()} />;

      case "ls":
        return fileSystem.ls(argument).map((item) => <Echo message={item} />);

      case "mkdir":
        return <Echo message={fileSystem.mkdir(argument)} />;

      case "touch":
        return <Echo message={fileSystem.touch(argument, argumentAnother)} />;

      case "cat":
        return <Echo message={fileSystem.cat(argument)} />;

      case "rm":
        return <Echo message={fileSystem.rm(argument)} />;

      case "mv":
        return <Echo message={fileSystem.mv(argument, argumentAnother)} />;

      case "submit":
        return <Submit argument={argument} />;

      case "":
        return <Echo message={""} />;

      default:
        return <Echo message={`Error: Command "${key}" not found`} />;
    }
  };

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [inputValue]
  );

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      processInputString(inputValue);
      setCommandsHistory([...commandsHistory, inputValue]);
      setInputValue("");
    },
    [inputValue, commandsHistory]
  );

  const clickHandler = () => {
    inputRef.current && inputRef.current.focus();
  };

  return (
    <Container maxW={"3xl"} id="terminal">
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        pb={{ base: 20, md: 36 }}
      >
        <Stack align="center" direction="row" p={4}>
          <HStack mx={4}>
            <Text fontWeight={800}>Terminal</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Stack>
        <Stack px={4} spacing={4}>
          <Box
            onClick={() => clickHandler()}
            h={"60vh"}
            p={"1rem"}
            boxShadow={{ base: "none", sm: "md" }}
            boxSizing={"border-box"}
            borderRadius={{ base: "none", sm: "lg" }}
            border={"1px solid green"}
            overflowY={"auto"}
            overflowX={"hidden"}
          >
            {commandsHistory.map((item: any, index: number) => (
              <Box key={index}>
                <HistoryItems
                  user={user}
                  path={fileSystem.getCurrentDirectory}
                  inputValue={item}
                />
                <Box color={"gray.400"}>{renderTerminalResponse(item)}</Box>
              </Box>
            ))}

            <Path user={user} path={fileSystem.getCurrentDirectory} />
            <CommandInput
              data-testid="terminalInput"
              ref={inputRef}
              inputValue={inputValue}
              changeHandler={changeHandler}
              submitHandler={submitHandler}
            />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Terminal;
