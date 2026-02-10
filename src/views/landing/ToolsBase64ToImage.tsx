import { ReactElement, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Navigation from "../../components/landing/tools/Navigation";

const ToolsBase64ToImage = (): ReactElement => {
  const toast = useToast();
  const bgColor = useColorModeValue("gray.100", "gray.900");
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
      <Navigation />
      <VStack spacing={8}>
        <Box w="100%">
          <Heading size="md" mb={4}>
            Base64 to Image
          </Heading>
          <Text mb={4} fontSize="sm" color="gray.500">
            Paste a Base64-encoded image string below. Supports PNG, JPEG, GIF,
            WebP, BMP, SVG, and ICO formats. You can include the data URI prefix
            (e.g. data:image/png;base64,...) or just the raw Base64 string.
          </Text>
          <Textarea
            placeholder="Paste Base64 string here..."
            value={base64Input}
            bg={bgColor}
            onChange={handleInputChange}
            size="md"
            mb={4}
            minH="150px"
          />
          <Button size="sm" colorScheme="red" onClick={handleClear} mr={2}>
            Clear
          </Button>
          {imageSrc && (
            <Button size="sm" colorScheme="teal" onClick={handleDownload}>
              Download Image
            </Button>
          )}
        </Box>

        {error && (
          <Box w="100%" p={4} bg="red.50" borderRadius="md">
            <Text color="red.500">{error}</Text>
          </Box>
        )}

        {imageSrc && !error && (
          <Box w="100%" p={4} bg={bgColor} borderRadius="md" textAlign="center">
            <Heading size="sm" mb={4}>
              Preview
            </Heading>
            <Image
              src={imageSrc}
              alt="Decoded image"
              maxW="100%"
              maxH="500px"
              mx="auto"
              onError={handleImageError}
            />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default ToolsBase64ToImage;
