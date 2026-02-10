import { ReactElement, useState } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaCalculator } from "react-icons/fa";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsStringCount = (): ReactElement => {
  const [textAreas, setTextAreas] = useState<string[]>([""]);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const addTextArea = () => {
    setTextAreas([...textAreas, ""]);
  };

  const removeTextArea = (index: number) => {
    const newTextAreas = textAreas.filter((_, i) => i !== index);
    setTextAreas(newTextAreas);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    autoResizeTextarea(e.target);
    const updatedTextAreas = [...textAreas];
    updatedTextAreas[index] = e.target.value;
    setTextAreas(updatedTextAreas);
  };

  const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} className="animate-fade-in-up">
        <VStack spacing={3} textAlign="center">
          <Icon as={FaCalculator} boxSize={8} color="teal.400" />
          <Heading size="lg" className="gradient-text">
            String Character Counter
          </Heading>
          <Text color={subtitleColor} fontSize="sm">
            Count characters in one or more text blocks
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
          {textAreas.map((text, index) => (
            <Box key={index} w="100%" mb={4} position="relative">
              <Textarea
                value={text}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Text block ${index + 1}...`}
                size="lg"
                bg={inputBg}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                _focus={{
                  borderColor: "teal.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
                }}
                minH="150px"
                resize="none"
                mb={2}
              />
              <HStack
                position="absolute"
                bottom="16px"
                right="12px"
                spacing={2}
                zIndex={2}
              >
                <Box
                  bg="teal.400"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="700"
                >
                  {text.length} chars
                </Box>
                {textAreas.length > 1 && (
                  <IconButton
                    aria-label="Remove text area"
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => removeTextArea(index)}
                  />
                )}
              </HStack>
            </Box>
          ))}

          <Button
            colorScheme="teal"
            onClick={addTextArea}
            leftIcon={<AddIcon />}
            borderRadius="xl"
            size="md"
            mt={2}
          >
            Add Text Area
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default ToolsStringCount;
