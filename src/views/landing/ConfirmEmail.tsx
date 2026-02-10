import { ReactElement, useEffect, useState } from "react";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import {
  Box,
  Center,
  Container,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { Logo } from "../../components/common/Logo";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ConfirmEmail = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");

  const [success, setSuccess] = useState<boolean>(false);
  const confirmEmail = async () => {
    try {
      await ApiCalls.confirmEmail({
        payload: { token: token ? token : "invalid" },
      });
      setSuccess(true);
      toast({
        title: "Email confirmed",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
    } catch (err) {
      toast({
        title: parseError(err),
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    confirmEmail();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8" className="animate-fade-in-up">
        <Stack spacing="6">
          <Logo color="teal.500" />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "sm", md: "md" }} className="gradient-text">
              Confirm your email
            </Heading>
            <Text color="gray.500" fontSize="sm">
              This is an automated process, please wait...
            </Text>
          </Stack>
        </Stack>
        <Box
          py={8}
          px={{ base: "4", sm: "10" }}
          bg={cardBg}
          boxShadow={{ base: "none", sm: "0 20px 60px -15px rgba(0,0,0,0.15)" }}
          borderRadius={{ base: "none", sm: "2xl" }}
          border={{ base: "none", sm: "1px solid" }}
          borderColor={borderColor}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <Box hidden={success} textAlign="center" py={4}>
                <Center mb={4}>
                  <Spinner size="xl" color="teal.400" thickness="4px" />
                </Center>
                <Heading mb={2} size="sm">
                  Confirming your email
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  Don't close this page.
                </Text>
              </Box>
              <Box hidden={!success} textAlign="center" py={4}>
                <Center color="teal.400" mb={4}>
                  <AiOutlineCheckCircle size="5rem" />
                </Center>
                <Heading mb={2} size="sm">
                  Email confirmed
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  You can close this page now.{" "}
                  <Box as="span" color="teal.400" fontWeight="600">
                    <Link to="/signin">Continue</Link>
                  </Box>
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ConfirmEmail;
