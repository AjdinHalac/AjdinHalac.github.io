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
import { FaCode } from "react-icons/fa";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsJSONFormatter = (): ReactElement => {
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const [jsonInput, setJsonInput] = useState("");
  const [formattedOutput, setFormattedOutput] = useState("");
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setFormattedOutput(formattedJson);
    } catch (err) {
      setFormattedOutput("");
      toast({
        title: "Invalid JSON input",
        description: "Please check your JSON syntax and try again.",
        status: "error",
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
      title: "Copied to clipboard!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResizeTextarea(outputTextareaRef.current);
  }, [formattedOutput]);

  return (
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} className="animate-fade-in-up">
        <VStack spacing={3} textAlign="center">
          <Icon as={FaCode} boxSize={8} color="teal.400" />
          <Heading size="lg" className="gradient-text">
            JSON Formatter
          </Heading>
          <Text color={subtitleColor} fontSize="sm">
            Beautify and validate your JSON data
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
            Input
          </Heading>
          <Textarea
            placeholder="Paste your JSON here..."
            value={jsonInput}
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
            onClick={handleFormatJson}
            leftIcon={<RepeatIcon />}
            borderRadius="xl"
            size="md"
          >
            Format JSON
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
            Formatted Output
          </Text>
          <Box position="relative">
            <Textarea
              value={formattedOutput || "No output yet"}
              ref={outputTextareaRef}
              isReadOnly
              onChange={(e) => autoResizeTextarea(e.target)}
              resize="vertical"
              minH="150px"
              bg={inputBg}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              fontFamily="mono"
              whiteSpace="pre-wrap"
              wordBreak="break-all"
              fontSize="sm"
            />
            {formattedOutput && (
              <IconButton
                aria-label="Copy formatted JSON"
                icon={<CopyIcon />}
                size="sm"
                variant="ghost"
                colorScheme="teal"
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
