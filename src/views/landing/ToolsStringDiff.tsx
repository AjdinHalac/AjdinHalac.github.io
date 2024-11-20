import { ReactElement, useEffect, useState } from "react";

import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { diffWords } from 'diff';
import Navigation from "../../components/landing/tools/Navigation";


const ToolsStringDiff = (): ReactElement => {
  const [string1, setString1] = useState<string>('');
  const [string2, setString2] = useState<string>('');
  const [diffResult, setDiffResult] = useState<any[]>([]);
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  const handleChangeString1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setString1(e.target.value);
  };

  const handleChangeString2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setString2(e.target.value);
  };

  useEffect(() => {
    const diff = diffWords(string1, string2);
    setDiffResult(diff);
  }, [string1, string2]);

  return (
    <Container maxW="3xl" py={10}>
      <Navigation></Navigation>
      <VStack spacing={8}>
        <Heading size="md">String Difference Tool</Heading>

        <HStack spacing={4} w="100%" mb={4}>
          <Box w="50%">
            <Textarea
              value={string1}
              onChange={handleChangeString1}
              size="md"
              bg={bgColor}
              minH="150px"
              resize="none" 
              placeholder="Enter the first string..."
              mb={4}
              _focus={{
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
              }}
            />
          </Box>

          <Box w="50%">
            <Textarea
              value={string2}
              onChange={handleChangeString2}
              size="md"
              bg={bgColor}
              minH="150px"
              resize="none"
              placeholder="Enter the second string..."
              mb={4}
              _focus={{
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
              }}
            />
          </Box>
        </HStack>

        <Box w="100%" p={4} borderRadius="md" bg={bgColor}>
          <Heading size="sm" mb={4}>Differences</Heading>
          <Box w="100%" whiteSpace="pre-wrap">
            {diffResult.map((part, index) => {
              const color = part.added
                ? 'green.300'
                : part.removed
                  ? 'red.300'
                  : 'gray.800'; 
              return (
                <Text
                  key={index}
                  as="span"
                  color={color}
                  fontWeight={part.added || part.removed ? 'bold' : 'normal'}
                >
                  {part.value}
                </Text>
              );
            })}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default ToolsStringDiff;
