import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { FaTerminal } from "react-icons/fa";

const Terminal = (): ReactElement => {
  const triggered = useRef<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  interface HistoryEntry {
    command: string;
    path: string;
    output: ReactNode;
  }
  const [commandsHistory, setCommandsHistory] = useState<HistoryEntry[]>([]);

  const terminalBg = useColorModeValue("gray.900", "gray.900");
  const terminalBorder = useColorModeValue(
    "rgba(49, 151, 149, 0.3)",
    "rgba(49, 151, 149, 0.4)",
  );
  const headerBg = useColorModeValue("gray.800", "gray.800");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const [user, setUser] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileSystem, setFileSystem] = useState<UnixFileSystem>(
    new UnixFileSystem(),
  );

  const getUser = async () => {
    if (!triggered.current) {
      if (cookieService.isAuthenticated()) {
        const user = await ApiCalls.getMe();
        setUser(user.data.email.split("@")[0]);
      } else {
        setUser("anon");
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
        "Flag might not be within the terminal, have you tried console?",
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

  const executeCommand = (command: string): ReactNode => {
    const [key, argument, argumentAnother] = processInputString(command);

    switch (key.toLowerCase()) {
      case "help":
        return <Help />;
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
        return (
          <>
            {fileSystem.ls(argument).map((item, i) => (
              <Echo key={i} message={item} />
            ))}
          </>
        );
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
        return <Echo message="" />;
      default:
        return <Echo message={`Error: Command "${key}" not found`} />;
    }
  };

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [inputValue],
  );

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = inputValue.trim();

      if (trimmed.toLowerCase() === "clear") {
        setCommandsHistory([]);
        setInputValue("");
        return;
      }

      const path = fileSystem.getCurrentDirectory;
      const output = executeCommand(trimmed);

      setCommandsHistory([
        ...commandsHistory,
        { command: trimmed, path, output },
      ]);
      setInputValue("");
    },
    [inputValue, commandsHistory, fileSystem, user],
  );

  const clickHandler = () => {
    inputRef.current && inputRef.current.focus();
  };

  return (
    <Container maxW="4xl" id="terminal">
      <Stack
        spacing={{ base: 6, md: 10 }}
        pb={{ base: 20, md: 36 }}
        pt={{ base: 4, md: 8 }}
      >
        {/* Header */}
        <Stack textAlign="center" spacing={3} className="animate-fade-in-up">
          <HStack justify="center" spacing={3}>
            <Icon as={FaTerminal} boxSize={5} color="teal.400" />
            <Heading size={{ base: "lg", md: "xl" }} className="gradient-text">
              Terminal
            </Heading>
          </HStack>
          <Text color={subtitleColor} fontSize="md" maxW="xl" mx="auto">
            Type{" "}
            <Text as="span" color="teal.400" fontWeight="600">
              help
            </Text>{" "}
            to get started
          </Text>
        </Stack>

        {/* Terminal Window */}
        <Box className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <Box
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor={terminalBorder}
            boxShadow="0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(49, 151, 149, 0.1)"
          >
            {/* macOS-style Title Bar */}
            <HStack
              bg={headerBg}
              px={4}
              py={3}
              spacing={2}
              borderBottom="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Box w="12px" h="12px" borderRadius="full" bg="#FF5F57" />
              <Box w="12px" h="12px" borderRadius="full" bg="#FFBD2E" />
              <Box w="12px" h="12px" borderRadius="full" bg="#28CA41" />
              <Text
                flex="1"
                textAlign="center"
                fontSize="xs"
                color="whiteAlpha.500"
                fontFamily="mono"
                fontWeight="500"
              >
                {user}@ajdinhalac ~ zsh
              </Text>
            </HStack>

            {/* Terminal Body */}
            <Box
              onClick={() => clickHandler()}
              h="60vh"
              p={5}
              bg={terminalBg}
              overflowY="auto"
              overflowX="hidden"
              fontFamily="'SF Mono', 'Fira Code', 'Cascadia Code', monospace"
              fontSize="sm"
              cursor="text"
              sx={{
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(49, 151, 149, 0.3)",
                  borderRadius: "3px",
                },
              }}
            >
              {commandsHistory.map((entry, index) => (
                <Box key={index} mb={1}>
                  <HistoryItems
                    user={user}
                    path={entry.path}
                    inputValue={entry.command}
                  />
                  <Box color="gray.400">{entry.output}</Box>
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
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Terminal;
