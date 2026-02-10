import {
  Box,
  Container,
  HStack,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function LandingFooter() {
  const mutedText = useColorModeValue("gray.500", "gray.500");

  return (
    <Box
      as="footer"
      role="contentinfo"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: "10%",
        right: "10%",
        height: "1px",
        bg: "linear-gradient(90deg, transparent, rgba(49, 151, 149, 0.3), transparent)",
      }}
    >
      <Container as={Stack} maxW={"4xl"} py={8}>
        <VStack spacing={4}>
          <HStack spacing={2}>
            <Tooltip label="LinkedIn" hasArrow>
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedin size={16} />}
                variant="ghost"
                borderRadius="full"
                size="sm"
                color={mutedText}
                _hover={{ color: "teal.400" }}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/ajdin-halac/",
                    "_blank",
                    "noreferrer,noopener",
                  )
                }
              />
            </Tooltip>
            <Tooltip label="GitHub" hasArrow>
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub size={16} />}
                variant="ghost"
                borderRadius="full"
                size="sm"
                color={mutedText}
                _hover={{ color: "teal.400" }}
                onClick={() =>
                  window.open(
                    "https://github.com/AjdinHalac",
                    "_blank",
                    "noreferrer,noopener",
                  )
                }
              />
            </Tooltip>
            <Tooltip label="Email" hasArrow>
              <IconButton
                aria-label="Email"
                icon={<FaEnvelope size={16} />}
                variant="ghost"
                borderRadius="full"
                size="sm"
                color={mutedText}
                _hover={{ color: "teal.400" }}
                onClick={() =>
                  window.open(
                    "mailto:ajdin.halac@hotmail.com",
                    "_blank",
                    "noreferrer,noopener",
                  )
                }
              />
            </Tooltip>
          </HStack>
          <Text fontSize="sm" color={mutedText}>
            Designed & Built by{" "}
            <Text as="span" color="teal.400" fontWeight={600}>
              Ajdin Halac
            </Text>
          </Text>
          <Text fontSize="xs" color={mutedText}>
            ©{new Date().getFullYear()} All rights reserved
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
