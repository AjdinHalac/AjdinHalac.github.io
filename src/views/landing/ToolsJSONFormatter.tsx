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

const ToolsJSONFormatter = (): ReactElement => {
  const toast = useToast();

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
    <Container maxW="6xl" py={10}>
      <Navigation></Navigation>
      <VStack spacing={8}>
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
