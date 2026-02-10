import { ReactElement, useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  IconButton,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaKey } from "react-icons/fa";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsJWTParser = (): ReactElement => {
  const [jwtInput, setJwtInput] = useState("");
  const [decodedPayload, setDecodedPayload] = useState("");
  const toast = useToast();
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  // Decode JWT
  const decodeJWT = (jwt: string) => {
    const parts = jwt.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    try {
      const payload = parts[1];
      const decoded = atob(payload); // Decode Base64Url
      return JSON.parse(decoded); // Parse JSON payload
    } catch (error) {
      throw new Error("Failed to decode JWT payload");
    }
  };

  // Handler for parsing JWT
  const handleParseJWT = () => {
    try {
      const parsedPayload = decodeJWT(jwtInput);
      setDecodedPayload(JSON.stringify(parsedPayload, null, 2));
    } catch (err) {
      setDecodedPayload("");
      toast({
        title: "Invalid JWT",
        description: "The JWT you entered is invalid or malformed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handler for input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJwtInput(e.target.value);
  };

  // Function to copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Auto-resize output textarea
  const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResizeTextarea(outputTextareaRef.current);
  }, [decodedPayload]);

  return (
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} className="animate-fade-in-up">
        <VStack spacing={3} textAlign="center">
          <Icon as={FaKey} boxSize={8} color="teal.400" />
          <Heading size="lg" className="gradient-text">
            JWT Parser
          </Heading>
          <Text color={subtitleColor} fontSize="sm">
            Decode and inspect JSON Web Tokens
          </Text>
        </VStack>

        <Navigation />

        <Box
          w="100%"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          p={{ base: 5, md: 8 }}
        >
          <Heading size="md" mb={4}>
            Token
          </Heading>
          <Textarea
            placeholder="Paste your JWT here..."
            value={jwtInput}
            onChange={handleInputChange}
            size="lg"
            mb={4}
            bg={inputBg}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
            }}
          />
          <Button
            colorScheme="teal"
            onClick={handleParseJWT}
            leftIcon={<RepeatIcon />}
            borderRadius="xl"
            size="md"
          >
            Parse JWT
          </Button>
        </Box>

        <Box
          w="100%"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          p={{ base: 5, md: 8 }}
        >
          <Text fontWeight="600" mb={3} fontSize="sm" color={subtitleColor}>
            Decoded Payload
          </Text>
          <Box position="relative">
            <Textarea
              ref={outputTextareaRef}
              value={decodedPayload || "No output yet"}
              isReadOnly
              fontFamily="mono"
              whiteSpace="pre-wrap"
              wordBreak="break-all"
              fontSize="sm"
              bg={inputBg}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              resize="none"
              overflow="hidden"
              minH="150px"
              onChange={(e) => autoResizeTextarea(e.target)}
            />
            {decodedPayload && (
              <IconButton
                aria-label="Copy decoded payload"
                icon={<CopyIcon />}
                size="sm"
                variant="ghost"
                colorScheme="teal"
                position="absolute"
                top="8px"
                right="8px"
                onClick={() => handleCopy(decodedPayload)}
              />
            )}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default ToolsJWTParser;
