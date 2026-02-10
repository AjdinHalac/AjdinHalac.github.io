import { ReactElement, useEffect, useState } from "react";

import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsBase64 = (): ReactElement => {
  const toast = useToast();
  const [encodeInput, setEncodeInput] = useState('');
  const [encodedOutput, setEncodedOutput] = useState('');

  const [decodeInput, setDecodeInput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');

  const handleEncodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setEncodeInput(input);
    try {
      const encoded = btoa(input);
      setEncodedOutput(encoded);
    } catch (error) {
      setEncodedOutput('Invalid input for Base64 encoding');
    }
  };

  const handleDecodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setDecodeInput(input);
    try {
      const decoded = atob(input);
      setDecodedOutput(decoded);
    } catch (error) {
      setDecodedOutput('Invalid Base64 string for decoding');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxW="6xl" py={10}>
      <Navigation></Navigation>
      <VStack spacing={8}>
        {/* Encoder Section */}
        <Box w="100%">
          <Heading size="md" mb={4}>Base64 Encoder</Heading>
          <Textarea
            placeholder="Enter text to encode"
            value={encodeInput}
            bg={useColorModeValue("gray.100", "gray.900")}
            onChange={handleEncodeChange}
            size="md"
            mb={4}
          />
          <Text fontWeight="bold" mb={3}>Encoded Output:</Text>
          <Box p={4} bg={useColorModeValue("gray.100", "gray.900")} borderRadius="md" w="100%" minH="50px">
            <HStack justify="space-between">
              <Text wordBreak="break-all">{encodedOutput}</Text>
              {encodedOutput && (
                <IconButton
                  aria-label="Copy encoded text"
                  icon={<CopyIcon />}
                  size="sm"
                  onClick={() => handleCopy(encodedOutput)}
                />
              )}
            </HStack>
          </Box>
        </Box>

        <Divider orientation="horizontal" />

        {/* Decoder Section */}
        <Box w="100%">
          <Heading size="md" mb={4}>Base64 Decoder</Heading>
          <Textarea
            placeholder="Enter Base64 string to decode"
            value={decodeInput}
            bg={useColorModeValue("gray.100", "gray.900")}
            onChange={handleDecodeChange}
            size="md"
            mb={4}
          />
          <Text fontWeight="bold" mb={3}>Decoded Output:</Text>
          <Box p={4} bg={useColorModeValue("gray.100", "gray.900")} borderRadius="md" w="100%" minH="50px">
            <HStack justify="space-between">
              <Text wordBreak="break-all">{decodedOutput}</Text>
              {decodedOutput && (
                <IconButton
                  aria-label="Copy decoded text"
                  icon={<CopyIcon />}
                  size="sm"
                  onClick={() => handleCopy(decodedOutput)}
                />
              )}
            </HStack>
          </Box>
        </Box>
      </VStack>
    </Container >
  );
};

export default ToolsBase64;
