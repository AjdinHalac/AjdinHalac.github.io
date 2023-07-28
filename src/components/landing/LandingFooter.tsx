import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LandingFooter() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      minHeight={"5vh"}
    >
      <Container as={Stack} maxW={"6xl"} py={4} align="center">
        <Text>©{new Date().getFullYear()} AjdinHalac</Text>
      </Container>
    </Box>
  );
}
