import React, { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import { ajaxService } from "../../services/AjaxService";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../../components/common/PasswordInput";
import { Logo } from "../../components/common/Logo";
import { cookieService } from "../../services/CookieService";

const SignIn = (): ReactElement => {
  const navigate = useNavigate();
  const toast = useToast();

  if (cookieService.isAuthenticated()) {
    window.location.replace("/");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remmemberMe, setRemmemberMe] = useState<boolean>(true);

  const onLoginClick = async () => {
    try {
      const newCredentials = await ApiCalls.login({
        payload: { email, password: password },
      });
      ajaxService.setAuthToken(
        newCredentials?.data?.accessToken,
        remmemberMe ? newCredentials?.data?.refreshToken : null
      );
      window.location.replace("/");
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
              Sign in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account?{" "}
              <Box as="span" color={"teal.500"}>
                <Link to="/signup">
                  Sign up
                </Link>
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
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.currentTarget.value)}
                />
              </FormControl>
              <PasswordField
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.currentTarget.value)}
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox
                colorScheme={"teal"}
                isChecked={remmemberMe}
                onChange={(e: any) => setRemmemberMe(e.currentTarget.checked)}
                my={2}
              >
                Remember me
              </Checkbox>
              <Button
                color={"teal.500"}
                variant="text"
                size="sm"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button colorScheme="teal" onClick={onLoginClick}>
                Sign in
              </Button>
              {/*<Divider />
                <Button flexGrow={1}>
                  <GoogleIcon /> Continue with Google{" "}
                </Button>*/}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignIn;
