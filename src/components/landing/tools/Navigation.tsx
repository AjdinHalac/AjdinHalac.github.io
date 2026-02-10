import {
  Box,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import {
  FaCode,
  FaExchangeAlt,
  FaKey,
  FaFileCode,
  FaImage,
  FaCalculator,
  FaAlignLeft,
} from "react-icons/fa";

interface ToolItem {
  label: string;
  description: string;
  path: string;
  icon: IconType;
  color: string;
}

const tools: ToolItem[] = [
  {
    label: "JSON Formatter",
    description: "Beautify & validate JSON",
    path: "/tools/json-formatter",
    icon: FaCode,
    color: "teal",
  },
  {
    label: "JSON To Go",
    description: "Convert JSON to Go structs",
    path: "/tools/json-to-go",
    icon: FaExchangeAlt,
    color: "blue",
  },
  {
    label: "JWT Parser",
    description: "Decode & inspect tokens",
    path: "/tools/jwt-parser",
    icon: FaKey,
    color: "purple",
  },
  {
    label: "Base64",
    description: "Encode & decode Base64",
    path: "/tools/base64",
    icon: FaFileCode,
    color: "blue",
  },
  {
    label: "Base64 → Image",
    description: "Preview Base64 images",
    path: "/tools/base64-to-image",
    icon: FaImage,
    color: "cyan",
  },
  {
    label: "String Counter",
    description: "Count chars, words & lines",
    path: "/tools/stringcount",
    icon: FaCalculator,
    color: "orange",
  },
  {
    label: "String Diff",
    description: "Compare two strings",
    path: "/tools/stringdiff",
    icon: FaAlignLeft,
    color: "green",
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.100");
  const descColor = useColorModeValue("gray.500", "gray.400");
  const labelColor = useColorModeValue("gray.400", "gray.500");

  return (
    <Box w="100%">
      <Text
        fontSize="xs"
        fontWeight="700"
        color={labelColor}
        textTransform="uppercase"
        letterSpacing="wider"
        mb={3}
      >
        All Tools
      </Text>
      <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} spacing={3} w="100%">
        {tools.map((tool) => {
          const isActive = location.pathname === tool.path;
          return (
            <Box
              key={tool.path}
              as="button"
              onClick={() => navigate(tool.path)}
              bg={cardBg}
              border={isActive ? "2px solid" : "1px solid"}
              borderColor={isActive ? `${tool.color}.400` : cardBorder}
              borderRadius="2xl"
              p={4}
              textAlign="left"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "lg",
                borderColor: `${tool.color}.400`,
              }}
              cursor="pointer"
            >
              <VStack align="start" spacing={1.5}>
                <Icon as={tool.icon} boxSize={5} color={`${tool.color}.400`} />
                <Text fontWeight={700} fontSize="sm">
                  {tool.label}
                </Text>
                <Text fontSize="xs" color={descColor} lineHeight="short">
                  {tool.description}
                </Text>
              </VStack>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Navigation;
