import { Box, Center, Container, Divider, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = (): ReactElement => {
  return (
    <Container maxW={"3xl"} id="contact">
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        pb={{ base: 20, md: 36 }}
      >
        <Stack align="center" direction="row" p={4}>
          <HStack mx={4}>
            <Text fontWeight={800}>Contact</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Stack>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={"3xl"}>Let's stay in touch!</Heading>
          <Text color={"gray.600"} fontSize={"xl"} px={4}>
            I'd love to hear from you! Whether you have questions about my
            products and services, want to discuss a collaboration, or simply
            want to say hello, don't hesitate to reach out. I am eager to assist
            and will get back to you as soon as possible. Your feedback and
            inquiries are important to me, and I look forward to connecting with
            you!
          </Text>
          <Text color={"teal.500"} fontWeight={600} fontSize={"lg"} px={4}>
            ajdin.halac@hotmail.com
          </Text>
          <Center>
            <HStack pt={4} spacing={4}>
              <FaLinkedin
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/ajdin-halac/",
                    "_blank",
                    "noreferrer,noopener"
                  );
                }}
                size={28}
              />
              <FaGithub
                onClick={() => {
                  window.open(
                    "https://github.com/AjdinHalac",
                    "_blank",
                    "noreferrer,noopener"
                  );
                }}
                size={28}
              />
              <FaEnvelope
                onClick={() => {
                  window.open(
                    "mailto:ajdin.halac@hotmail.com",
                    "_blank",
                    "noreferrer,noopener"
                  );
                }}
                size={28}
              />
            </HStack>
          </Center>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Contact;
