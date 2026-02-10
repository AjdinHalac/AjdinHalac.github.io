import { ReactElement, useEffect, useState } from "react";

import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { diffWords } from "diff";
import { FaAlignLeft } from "react-icons/fa";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsStringDiff = (): ReactElement => {
  const [string1, setString1] = useState<string>("");
  const [string2, setString2] = useState<string>("");
  const [diffResult, setDiffResult] = useState<any[]>([]);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const addedColor = useColorModeValue("green.600", "green.300");
  const removedColor = useColorModeValue("red.600", "red.300");
  const unchangedColor = useColorModeValue("gray.700", "gray.300");

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
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} className="animate-fade-in-up">
        <VStack spacing={3} textAlign="center">
          <Icon as={FaAlignLeft} boxSize={8} color="teal.400" />
          <Heading size="lg" className="gradient-text">
            String Difference
          </Heading>
          <Text color={subtitleColor} fontSize="sm">
            Compare two strings and highlight the differences
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
            Compare
          </Heading>
          <HStack spacing={4} w="100%" align="start">
            <Box w="50%">
              <Text fontWeight="600" fontSize="sm" color={subtitleColor} mb={2}>
                Original
              </Text>
              <Textarea
                value={string1}
                onChange={handleChangeString1}
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
                placeholder="Enter the first string..."
              />
            </Box>
            <Box w="50%">
              <Text fontWeight="600" fontSize="sm" color={subtitleColor} mb={2}>
                Modified
              </Text>
              <Textarea
                value={string2}
                onChange={handleChangeString2}
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
                placeholder="Enter the second string..."
              />
            </Box>
          </HStack>
        </Box>

        <Box
          w="100%"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          p={{ base: 5, md: 8 }}
        >
          <Text fontWeight="600" mb={4} fontSize="sm" color={subtitleColor}>
            Differences
          </Text>
          <Box
            w="100%"
            whiteSpace="pre-wrap"
            p={4}
            bg={inputBg}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            minH="60px"
            fontFamily="mono"
            fontSize="sm"
          >
            {diffResult.map((part, index) => {
              const color = part.added
                ? addedColor
                : part.removed
                  ? removedColor
                  : unchangedColor;
              return (
                <Text
                  key={index}
                  as="span"
                  color={color}
                  fontWeight={part.added || part.removed ? "bold" : "normal"}
                  bg={
                    part.added
                      ? "green.50"
                      : part.removed
                        ? "red.50"
                        : "transparent"
                  }
                  _dark={{
                    bg: part.added
                      ? "whiteAlpha.100"
                      : part.removed
                        ? "whiteAlpha.50"
                        : "transparent",
                  }}
                  px={part.added || part.removed ? 0.5 : 0}
                  borderRadius="sm"
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
