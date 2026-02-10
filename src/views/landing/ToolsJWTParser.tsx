import { ReactElement, useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon, RepeatIcon } from "@chakra-ui/icons";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsJWTParser = (): ReactElement => {
  const [jwtInput, setJwtInput] = useState('');
  const [decodedPayload, setDecodedPayload] = useState('');
  const toast = useToast();
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Decode JWT
  const decodeJWT = (jwt: string) => {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    try {
      const payload = parts[1];
      const decoded = atob(payload); // Decode Base64Url
      return JSON.parse(decoded); // Parse JSON payload
    } catch (error) {
      throw new Error('Failed to decode JWT payload');
    }
  };

  // Handler for parsing JWT
  const handleParseJWT = () => {
    try {
      const parsedPayload = decodeJWT(jwtInput);
      setDecodedPayload(JSON.stringify(parsedPayload, null, 2));
    } catch (err) {
      setDecodedPayload('');
      toast({
        title: 'Invalid JWT',
        description: 'The JWT you entered is invalid or malformed.',
        status: 'error',
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
      title: 'Copied to clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  // Auto-resize output textarea
  const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResizeTextarea(outputTextareaRef.current);
  }, [decodedPayload]);

  return (
    <Container maxW="6xl" py={10}>
      <Navigation></Navigation>
      <VStack spacing={8}>
        {/* JWT Input Section */}
        <Box w="100%">
          <Heading size="md" mb={4}>
            JWT Parser
          </Heading>
          <Textarea
            placeholder="Paste your JWT here"
            value={jwtInput}
            onChange={handleInputChange}
            size="md"
            mb={4}
            bg={useColorModeValue("gray.100", "gray.900")}
          />
          <Button colorScheme="teal" onClick={handleParseJWT} leftIcon={<RepeatIcon />} mb={4}>
            Parse JWT
          </Button>
        </Box>

        <Box w="100%">
          <Text fontWeight="bold" mb={2}>
            Decoded JWT Payload:
          </Text>
          <Box position="relative">
            <Textarea
              ref={outputTextareaRef}
              value={decodedPayload || 'No output yet'}
              isReadOnly
              fontFamily="monospace"
              whiteSpace="pre-wrap"
              wordBreak="break-all"
              bg={useColorModeValue("gray.100", "gray.900")}
              resize="none" // Disable manual resize
              overflow="hidden"
              minH="150px"
              onChange={(e) => autoResizeTextarea(e.target)}
            />
            {decodedPayload && (
              <IconButton
                aria-label="Copy decoded payload"
                icon={<CopyIcon />}
                size="sm"
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
