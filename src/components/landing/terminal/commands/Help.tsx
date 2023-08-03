import { Flex, HStack, List, ListItem } from "@chakra-ui/react";

const items = [
  {
    command: "help",
    pipe: "|",
    description: "displays the list of available commands",
  },
  {
    command: "clear",
    pipe: "|",
    description: "clears the console",
  },
  {
    command: "whoami",
    pipe: "|",
    description: "displays the current user",
  },
  {
    command: "echo",
    pipe: "|",
    description: "prints a message to the console",
  },
  {
    command: "social",
    pipe: "|",
    description: "displays the list of the developer social media",
  },
  {
    command: "connect",
    pipe: "|",
    description: "redirects towards my profile",
  },
  {
    command: "cd",
    pipe: "|",
    description: "changes current directory",
  },
  {
    command: "pwd",
    pipe: "|",
    description: "prints working directory and its path",
  },
  {
    command: "ls",
    pipe: "|",
    description: "prints current directory content",
  },
  {
    command: "mkdir",
    pipe: "|",
    description: "creates a new directory in current directory",
  },
  {
    command: "touch",
    pipe: "|",
    description: "creates a new file in current directory",
  },
  {
    command: "cat",
    pipe: "|",
    description: "prints out contents of specified file",
  },
];

const Help = () => {
  return (
    <List spacing={2}>
      {items.map((item, index) => (
        <ListItem flex={"1"} key={index}>
          <HStack>
            <Flex as="span" w={"20%"}>
              {item.command}
            </Flex>
            <Flex as="span" w={"5%"}>
              {item.pipe}
            </Flex>
            <Flex as="span">{item.description}</Flex>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default Help;
