import { ReactElement, useState } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsStringCount = (): ReactElement => {
  const [textAreas, setTextAreas] = useState<string[]>(['']);
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  const addTextArea = () => {
    setTextAreas([...textAreas, '']);
  };

  const removeTextArea = (index: number) => {
    const newTextAreas = textAreas.filter((_, i) => i !== index);
    setTextAreas(newTextAreas);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    autoResizeTextarea(e.target)
    const updatedTextAreas = [...textAreas];
    updatedTextAreas[index] = e.target.value;
    setTextAreas(updatedTextAreas);
  };

  const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  return (
    <Container maxW="3xl" py={10}>
      <Navigation></Navigation>
      <VStack spacing={8}>
        <Heading size="md">String Character Counter</Heading>

        <Box w="100%">
          {textAreas.map((text, index) => (
            <Box key={index} w="100%" mb={4} position="relative">
              <Textarea
                value={text}
                onChange={(e) => handleChange(e, index)}
                size="md"
                bg={bgColor}
                minH="150px"
                resize="none"
                mb={2}
              />
              <Text
                fontSize="lg"
                fontWeight="bold"
                position="absolute"
                bottom="8px"
                right="8px"
                color="teal.500"
                zIndex={2}
              >
                {text.length} chars
              </Text>
              {textAreas.length > 1 && (
                <IconButton
                  aria-label="Remove text area"
                  icon={<DeleteIcon />}
                  size="sm"
                  position="absolute"
                  top="8px"
                  right="8px"
                  zIndex={2}
                  onClick={() => removeTextArea(index)}
                />
              )}
            </Box>
          ))}
        </Box>

        <Button colorScheme="teal" onClick={addTextArea} leftIcon={<AddIcon />}>
          Add Text Area
        </Button>
      </VStack>
    </Container>
  );
};


export default ToolsStringCount;
