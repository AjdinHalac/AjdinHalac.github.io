import { ReactElement, useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon, RepeatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const ToolsJSONFormatter = (): ReactElement => {
  const toast = useToast();
  const navigate = useNavigate();

  const [jsonInput, setJsonInput] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setFormattedOutput(formattedJson);
    } catch (err) {
      setFormattedOutput('');
      toast({
        title: 'Invalid JSON input',
        description: 'Please check your JSON syntax and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
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

  const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResizeTextarea(outputTextareaRef.current);
  }, [formattedOutput]);

  return (
    <Container maxW="3xl" py={10}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={10}>
        <Button
          colorScheme="teal" onClick={() => navigate('/tools/json-formatter')}>
          JSON Formatter
        </Button>
        <Button colorScheme="purple" onClick={() => navigate('/tools/jwt-parser')}>
          JWT Parser
        </Button>
        <Button colorScheme="blue" onClick={() => navigate('/tools/base64')}>
          Base64
        </Button>
        <Button colorScheme="orange" onClick={() => navigate('/tools/stringcount')}>
          String Counter
        </Button>
        <Button colorScheme="green" onClick={() => navigate('/tools/stringdiff')}>
          String Difference
        </Button>
      </Stack>

      <VStack spacing={8}>
        {/* JSON Formatter Input Section */}
        <Box w="100%">
          <Heading size="md" mb={4}>
            JSON Formatter
          </Heading>
          <Textarea
            placeholder="Paste your JSON here"
            value={jsonInput}
            onChange={handleInputChange}
            size="md"
            mb={4}
            bg={useColorModeValue("gray.100", "gray.900")}
          />
          <Button colorScheme="teal" onClick={handleFormatJson} leftIcon={<RepeatIcon />} mb={4}>
            Format JSON
          </Button>
        </Box>

        <Box w="100%">
          <Text fontWeight="bold" mb={2}>
            Formatted JSON Output:
          </Text>
          <Box
            position="relative"
          >
            <Textarea
              value={formattedOutput || 'No output yet'}
              ref={outputTextareaRef}
              isReadOnly
              onChange={(e) => autoResizeTextarea(e.target)}
              resize="vertical"
              minH="150px"
              bg={useColorModeValue("gray.100", "gray.900")}
              fontFamily="monospace"
              whiteSpace="pre-wrap"
              wordBreak="break-all"
            />
            {formattedOutput && (
              <IconButton
                aria-label="Copy formatted JSON"
                icon={<CopyIcon />}
                size="sm"
                position="absolute"
                top="8px"
                right="8px"
                onClick={() => handleCopy(formattedOutput)}
              />
            )}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default ToolsJSONFormatter;
