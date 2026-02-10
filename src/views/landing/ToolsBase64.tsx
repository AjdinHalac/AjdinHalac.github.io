import { ReactElement, useEffect, useState } from "react";

import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { FaFileCode } from "react-icons/fa";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsBase64 = (): ReactElement => {
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const [encodeInput, setEncodeInput] = useState("");
  const [encodedOutput, setEncodedOutput] = useState("");

  const [decodeInput, setDecodeInput] = useState("");
  const [decodedOutput, setDecodedOutput] = useState("");

  const handleEncodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setEncodeInput(input);
    try {
      const encoded = btoa(input);
      setEncodedOutput(encoded);
    } catch (error) {
      setEncodedOutput("Invalid input for Base64 encoding");
    }
  };

  const handleDecodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setDecodeInput(input);
    try {
      const decoded = atob(input);
      setDecodedOutput(decoded);
    } catch (error) {
      setDecodedOutput("Invalid Base64 string for decoding");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} className="animate-fade-in-up">
        <VStack spacing={3} textAlign="center">
          <Icon as={FaFileCode} boxSize={8} color="teal.400" />
          <Heading size="lg" className="gradient-text">
            Base64 Encoder / Decoder
          </Heading>
          <Text color={subtitleColor} fontSize="sm">
            Encode and decode Base64 strings instantly
          </Text>
        </VStack>

        <Navigation />

        {/* Encoder Section */}
        <Box
          w="100%"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          p={{ base: 5, md: 8 }}
        >
          <Heading size="md" mb={4}>
            Encoder
          </Heading>
          <Textarea
            placeholder="Enter text to encode..."
            value={encodeInput}
            bg={inputBg}
            onChange={handleEncodeChange}
            size="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
            }}
            mb={4}
          />
          <Text fontWeight="600" mb={3} fontSize="sm" color={subtitleColor}>
            Encoded Output
          </Text>
          <Box
            p={4}
            bg={inputBg}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            w="100%"
            minH="60px"
          >
            <HStack justify="space-between" align="start">
              <Text wordBreak="break-all" fontFamily="mono" fontSize="sm">
                {encodedOutput}
              </Text>
              {encodedOutput && (
                <IconButton
                  aria-label="Copy encoded text"
                  icon={<CopyIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => handleCopy(encodedOutput)}
                />
              )}
            </HStack>
          </Box>
        </Box>

        {/* Decoder Section */}
        <Box
          w="100%"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          p={{ base: 5, md: 8 }}
        >
          <Heading size="md" mb={4}>
            Decoder
          </Heading>
          <Textarea
            placeholder="Enter Base64 string to decode..."
            value={decodeInput}
            bg={inputBg}
            onChange={handleDecodeChange}
            size="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
            }}
            mb={4}
          />
          <Text fontWeight="600" mb={3} fontSize="sm" color={subtitleColor}>
            Decoded Output
          </Text>
          <Box
            p={4}
            bg={inputBg}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            w="100%"
            minH="60px"
          >
            <HStack justify="space-between" align="start">
              <Text wordBreak="break-all" fontFamily="mono" fontSize="sm">
                {decodedOutput}
              </Text>
              {decodedOutput && (
                <IconButton
                  aria-label="Copy decoded text"
                  icon={<CopyIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => handleCopy(decodedOutput)}
                />
              )}
            </HStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default ToolsBase64;
