import { Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={10}>
      <Button
        colorScheme="teal"
        onClick={() => navigate("/tools/json-formatter")}
      >
        JSON Formatter
      </Button>
      <Button colorScheme="blue" onClick={() => navigate("/tools/json-to-go")}>
        JSON To Go
      </Button>
      <Button
        colorScheme="purple"
        onClick={() => navigate("/tools/jwt-parser")}
      >
        JWT Parser
      </Button>
      <Button colorScheme="blue" onClick={() => navigate("/tools/base64")}>
        Base64
      </Button>
      <Button
        colorScheme="cyan"
        onClick={() => navigate("/tools/base64-to-image")}
      >
        Base64 To Image
      </Button>
      <Button
        colorScheme="orange"
        onClick={() => navigate("/tools/stringcount")}
      >
        String Counter
      </Button>
      <Button colorScheme="green" onClick={() => navigate("/tools/stringdiff")}>
        String Difference
      </Button>
    </Stack>
  );
};

export default Navigation;
