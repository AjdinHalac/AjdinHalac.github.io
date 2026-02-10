import { ReactElement, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsBase64ToImage = (): ReactElement => {
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const [base64Input, setBase64Input] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setBase64Input(input);
    processBase64(input);
  };

  const processBase64 = (input: string) => {
    if (!input.trim()) {
      setImageSrc("");
      setError("");
      return;
    }

    let src = input.trim();

    // If the input already has a data URI prefix, use it as-is
    if (src.startsWith("data:image/")) {
      setImageSrc(src);
      setError("");
      return;
    }

    // Try to detect the image type from the base64 header bytes
    const mimeType = detectMimeType(src);
    if (mimeType) {
      src = `data:${mimeType};base64,${src}`;
    } else {
      // Default to png if we can't detect the type
      src = `data:image/png;base64,${src}`;
    }

    setImageSrc(src);
    setError("");
  };

  const detectMimeType = (base64: string): string | null => {
    try {
      const binaryStr = atob(base64.substring(0, 16));
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      // PNG: 89 50 4E 47
      if (
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47
      ) {
        return "image/png";
      }
      // JPEG: FF D8 FF
      if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
        return "image/jpeg";
      }
      // GIF: 47 49 46
      if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
        return "image/gif";
      }
      // WEBP: 52 49 46 46 ... 57 45 42 50
      if (
        bytes[0] === 0x52 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x46 &&
        bytes[3] === 0x46
      ) {
        return "image/webp";
      }
      // BMP: 42 4D
      if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
        return "image/bmp";
      }
      // SVG: starts with '<' (3C)
      if (bytes[0] === 0x3c) {
        return "image/svg+xml";
      }
      // ICO: 00 00 01 00
      if (
        bytes[0] === 0x00 &&
        bytes[1] === 0x00 &&
        bytes[2] === 0x01 &&
        bytes[3] === 0x00
      ) {
        return "image/x-icon";
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleImageError = () => {
    setError(
      "Unable to render image. Please check that the Base64 string is valid.",
    );
  };

  const handleClear = () => {
    setBase64Input("");
    setImageSrc("");
    setError("");
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image";
    link.click();
    toast({
      title: "Download started!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} className="animate-fade-in-up">
        <VStack spacing={3} textAlign="center">
          <Icon as={FaImage} boxSize={8} color="teal.400" />
          <Heading size="lg" className="gradient-text">
            Base64 to Image
          </Heading>
          <Text color={subtitleColor} fontSize="sm">
            Paste a Base64-encoded image string below. Supports PNG, JPEG, GIF,
            WebP, BMP, SVG, and ICO formats.
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
          <Text mb={4} fontSize="sm" color={subtitleColor}>
            You can include the data URI prefix (e.g. data:image/png;base64,...)
            or just the raw Base64 string.
          </Text>
          <Textarea
            placeholder="Paste Base64 string here..."
            value={base64Input}
            bg={inputBg}
            onChange={handleInputChange}
            size="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
            }}
            mb={4}
            minH="150px"
          />
          <HStack spacing={3}>
            <Button
              size="md"
              variant="outline"
              colorScheme="red"
              borderRadius="xl"
              onClick={handleClear}
            >
              Clear
            </Button>
            {imageSrc && (
              <Button
                size="md"
                colorScheme="teal"
                borderRadius="xl"
                onClick={handleDownload}
              >
                Download Image
              </Button>
            )}
          </HStack>
        </Box>

        {error && (
          <Box
            w="100%"
            p={4}
            bg="red.50"
            border="1px solid"
            borderColor="red.200"
            borderRadius="2xl"
            _dark={{ bg: "red.900", borderColor: "red.600" }}
          >
            <Text color="red.500" _dark={{ color: "red.300" }}>
              {error}
            </Text>
          </Box>
        )}

        {imageSrc && !error && (
          <Box
            w="100%"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="2xl"
            p={{ base: 5, md: 8 }}
            textAlign="center"
          >
            <Heading size="md" mb={6}>
              Preview
            </Heading>
            <Image
              src={imageSrc}
              alt="Decoded image"
              maxW="100%"
              maxH="500px"
              mx="auto"
              borderRadius="xl"
              onError={handleImageError}
            />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default ToolsBase64ToImage;
