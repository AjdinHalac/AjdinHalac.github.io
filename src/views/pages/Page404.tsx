import { ReactElement, useState } from "react";

import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Page404 = (): ReactElement => {
  const [search, setSearch] = useState("");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8" className="animate-fade-in-up" textAlign="center">
        {/* Big 404 */}
        <Box>
          <Text
            fontSize={{ base: "8xl", md: "9xl" }}
            fontWeight="900"
            lineHeight="1"
            className="gradient-text"
            letterSpacing="-0.05em"
          >
            404
          </Text>
        </Box>

        <Stack spacing={3}>
          <Heading size={{ base: "md", md: "lg" }}>
            Oops! You{"'"}re lost.
          </Heading>
          <Text color={subtitleColor} fontSize="md">
            The page you are looking for was not found.
          </Text>
        </Stack>

        {/* Search & Actions Card */}
        <Box
          py={8}
          px={{ base: "4", sm: "10" }}
          bg={cardBg}
          boxShadow="0 20px 60px -15px rgba(0,0,0,0.1)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          className="animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Stack spacing={5}>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="teal.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search for something..."
                borderRadius="xl"
                border="2px solid"
                borderColor={borderColor}
                onChange={(e) => setSearch(e.target.value)}
                _focus={{
                  borderColor: "teal.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
                }}
              />
            </InputGroup>
            <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
              <Button
                colorScheme="teal"
                size="lg"
                borderRadius="xl"
                flex="1"
                onClick={() =>
                  window.location.replace(
                    `http://www.google.com/search?q=${encodeURIComponent(
                      search,
                    )}+site%3Aajdinhalac.dev`,
                  )
                }
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
                }}
              >
                Search
              </Button>
              <Link to="/" style={{ flex: 1 }}>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  size="lg"
                  borderRadius="xl"
                  w="100%"
                  _hover={{
                    transform: "translateY(-2px)",
                  }}
                >
                  Go Home
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Page404;
