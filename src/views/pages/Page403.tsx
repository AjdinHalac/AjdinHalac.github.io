import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Logo } from "../../components/common/Logo";
import { SearchIcon } from "@chakra-ui/icons";

const Page403 = (): ReactElement => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo color={"teal.500"} />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading as="h1" size={{ base: "sm", md: "sm" }}>
              403
            </Heading>
            <Text>You cannot pass!</Text>
            <Text>I am the servant of the Secret Fire, wielder of the Flame of Anor...</Text>
            <Text>The dark fire will not avail you! Flame of Udûn!</Text>
            <Text>Go back to the Shadow!</Text>
            <Heading as="h2">You shall not pass!</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon name="cil-magnifying-glass" />
                </InputLeftElement>
                <Input
                  size="16"
                  type="text"
                  placeholder="What are you looking for?"
                />
                <InputRightElement width={"4.5em"}>
                  <Button colorScheme="teal">Search</Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Page403;
