import { ReactElement } from "react";

import { SearchIcon } from "@chakra-ui/icons";
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
import { Logo } from "../../components/common/Logo";

const Page404 = (): ReactElement => {
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
              404
            </Heading>
            <Heading as="h2">Oops! You{"'"}re lost.</Heading>
            <Text>The page you are looking for was not found.</Text>
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

export default Page404;
