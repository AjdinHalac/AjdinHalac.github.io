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
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../components/common/Logo";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PasswordField } from "../../components/common/PasswordInput";
import { cookieService } from "../../services/CookieService";

const ResetPassword = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToast();

  if (cookieService.isAuthenticated()) {
    window.location.replace("/");
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
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo color={"teal.500"} />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Create a new password
            </Heading>
            <Text color="fg.muted">
              Don't have an account?{" "}
              <Box as="span" color={"teal.500"}>
                <Link to="/signup">Sign up</Link>
              </Box>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
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

              <Box hidden={!success}>
                <Center color={"teal.500"}>
                  <AiOutlineCheckCircle size={"6rem"} />
                </Center>
                <Heading my={2} size={{ base: "xs", md: "sm" }}>
                  Password reset
                </Heading>
                <Text color="fg.muted">
                  <Box as="span" color={"teal.500"}>
                    <Link to="/signin">
                      Sign in now 
                    </Link>
                  </Box>
                </Text>
              </Box>
            </Stack>
            <Stack hidden={success} spacing="6">
              <Button colorScheme="teal" onClick={onResetPasswordClick}>Reset password</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ResetPassword;
