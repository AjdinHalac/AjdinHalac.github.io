import { Code, Flex, HStack, Link, List, ListItem, VStack } from "@chakra-ui/react";

export const socialMedia = [
  {
    site: "LinkedIn",
    url: "https://www.linkedin.com/in/ajdin-halac/",
  },
  {
    site: "GitHub",
    url: "https://github.com/AjdinHalac",
  },
  {
    site: "Instagram",
    url: "https://www.instagram.com/ajdin.halac/",
  },
];

const Social = () => {
  return (
    <>
      <List my={1} spacing={2}>
        {socialMedia.map((item, index) => (
          <ListItem flex={1} key={index}>
            <HStack>
              <Flex as="span" w={"30%"}>{item.site}:</Flex>
              <Flex as="span" w={"60%"}>
                <Link color={"green.400"} href={item.url} isExternal> {item.url}</Link>
              </Flex>
            </HStack>
          </ListItem>
        ))}
      </List>

      <VStack my={2} align={"left"}>
        <Flex as="span">
          A shortcut to open any of the social media listed above is the{" "}
          <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal" mx={1}>
            connect
          </Code>
          command.
        </Flex>
        <Flex>
          For example:
          <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal" mx={1}>
            connect github
          </Code>
          . Try it out!
        </Flex>
      </VStack>
    </>
  );
};

export default Social;
