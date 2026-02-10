import React, { ReactElement, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import ApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../components/common/Logo";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PasswordField } from "../../components/common/PasswordInput";
import { cookieService } from "../../services/CookieService";

const ResetPassword = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");

  if (cookieService.isAuthenticated()) {
    window.location.replace("/#/");
  }

  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onResetPasswordClick = async () => {
    try {
      await ApiCalls.resetPassword({
        payload: { token: token ? token : "invalid", password: password },
      });
      setSuccess(true);
      toast({
        title: "Password reset",
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
              Create a new password
            </Heading>
            <Text color="gray.500">
              Don't have an account?{" "}
              <Box as="span" color="teal.400" fontWeight="600">
                <Link to="/signup">Sign up</Link>
              </Box>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={cardBg}
          boxShadow={{ base: "none", sm: "0 20px 60px -15px rgba(0,0,0,0.15)" }}
          borderRadius={{ base: "none", sm: "2xl" }}
          border={{ base: "none", sm: "1px solid" }}
          borderColor={borderColor}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl hidden={success}>
                <PasswordField
                  label="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.currentTarget.value)}
                />
              </FormControl>

              <Box hidden={!success} textAlign="center" py={4}>
                <Center color="teal.400" mb={4}>
                  <AiOutlineCheckCircle size="5rem" />
                </Center>
                <Heading mb={2} size="sm">
                  Password reset
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  <Box as="span" color="teal.400" fontWeight="600">
                    <Link to="/signin">Sign in now</Link>
                  </Box>
                </Text>
              </Box>
            </Stack>
            <Stack hidden={success} spacing="4">
              <Button
                colorScheme="teal"
                size="lg"
                borderRadius="xl"
                fontWeight="700"
                onClick={onResetPasswordClick}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
                }}
              >
                Reset password
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ResetPassword;
