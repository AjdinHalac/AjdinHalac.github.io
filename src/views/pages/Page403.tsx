import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Page403 = (): ReactElement => {
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
        {/* Big 403 */}
        <Box>
          <Text
            fontSize={{ base: "8xl", md: "9xl" }}
            fontWeight="900"
            lineHeight="1"
            className="gradient-text"
            letterSpacing="-0.05em"
          >
            403
          </Text>
        </Box>

        {/* LOTR Personality */}
        <Stack spacing={3}>
          <Heading size={{ base: "md", md: "lg" }}>You shall not pass!</Heading>
          <Text color={subtitleColor} fontSize="md" fontStyle="italic">
            "I am the servant of the Secret Fire, wielder of the Flame of
            Anor..."
          </Text>
          <Text color={subtitleColor} fontSize="sm">
            The dark fire will not avail you, Flame of Udûn!
          </Text>
        </Stack>

        {/* Action Card */}
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
          <Stack spacing={4} align="center">
            <Text color={subtitleColor} fontSize="sm">
              Go back to the Shadow! ...or try one of these instead:
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
              <Link to="/">
                <Button
                  colorScheme="teal"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
                  }}
                >
                  Go Home
                </Button>
              </Link>
              <Link to="/terminal">
                <Button
                  variant="outline"
                  colorScheme="teal"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    transform: "translateY(-2px)",
                  }}
                >
                  Open Terminal
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Page403;
