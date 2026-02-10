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
import { FaExchangeAlt } from "react-icons/fa";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsJSONToGo = (): ReactElement => {
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const [jsonInput, setJsonInput] = useState("");
  const [goOutput, setGoOutput] = useState("");
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null);
  // Function to handle JSON-to-Go conversion
  const convertJsonToGo = () => {
    try {
      const json = JSON.parse(jsonInput);
      const goCode = jsonToGo(json);
      setGoOutput(goCode);
    } catch (error) {
      setGoOutput("");
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
  }, [goOutput]);

  const jsonToGo = (
    json: any,
    typeName: string = "GeneratedStruct",
  ): string => {
    if (typeof json !== "object" || json === null) {
      return "";
    }

    if (Array.isArray(json)) {
      const elementType = inferArrayElementType(json);
      return `[]${elementType}`;
    }

    const fields = Object.entries(json)
      .map(([key, value]) => {
        const fieldName = capitalizeFirstLetter(key);
        const fieldType = getGoType(value, capitalizeFirstLetter(key));
        return `\t${fieldName} ${fieldType} \`json:"${key}"\``;
      })
      .join("\n");

    return `type ${typeName} struct {\n${fields}\n}`;
  };

  // Infer Go type
  const getGoType = (value: any, typeName: string): string => {
    if (value === null) {
      return "interface{}";
    }

    switch (typeof value) {
      case "string":
        return "string";
      case "number":
        return "float64";
      case "boolean":
        return "bool";
      case "object":
        if (Array.isArray(value)) {
          return inferArrayElementType(value);
        }
        return jsonToGo(value, `${typeName}Type`);
      default:
        return "interface{}";
    }
  };

  // Infer the type of elements in an array
  const inferArrayElementType = (arr: any[]): string => {
    const uniqueTypes = Array.from(
      new Set(arr.map((element) => getGoType(element, "Element"))),
    );

    if (uniqueTypes.length === 1) {
      return `[]${uniqueTypes[0]}`;
    }
    return "[]interface{}"; // Mixed types
  };

  // Capitalize the first letter
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} className="animate-fade-in-up">
        <VStack spacing={3} textAlign="center">
          <Icon as={FaExchangeAlt} boxSize={8} color="teal.400" />
          <Heading size="lg" className="gradient-text">
            JSON to Go
          </Heading>
          <Text color={subtitleColor} fontSize="sm">
            Convert JSON objects to Go struct definitions
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
            onClick={convertJsonToGo}
            leftIcon={<RepeatIcon />}
            borderRadius="xl"
            size="md"
          >
            Convert
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
            Generated Go Struct
          </Text>
          <Box position="relative">
            <Textarea
              value={goOutput || "No output yet"}
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
            {goOutput && (
              <IconButton
                aria-label="Copy Go struct"
                icon={<CopyIcon />}
                size="sm"
                variant="ghost"
                colorScheme="teal"
                position="absolute"
                top="8px"
                right="8px"
                onClick={() => handleCopy(goOutput)}
              />
            )}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default ToolsJSONToGo;
