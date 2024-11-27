import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import ApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../components/common/Logo";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { cookieService } from "../../services/CookieService";

const ForgotPassword = (): ReactElement => {
  const toast = useToast();

  if (cookieService.isAuthenticated()) {
    window.location.replace("/#/");
  }

  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onForgotPasswordClick = async () => {
    try {
      await ApiCalls.forgotPassword({ payload: { email } });
      setSuccess(true);
      toast({
        title: "Email sent",
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
            <Heading size={{ base: "xs", md: "sm" }}>Account recovery</Heading>
            <Text color="fg.muted">
              Already have an account?{" "}
              <Box as="span" color={"teal.500"}>
                <Link to="/signin">Sign in</Link>
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
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.currentTarget.value)}
                />
              </FormControl>

              <Box hidden={!success}>
                <Center color={"teal.500"}>
                  <AiOutlineCheckCircle size={"6rem"} />
                </Center>
                <Heading my={2} size={{ base: "xs", md: "sm" }}>
                  Email sent
                </Heading>
                <Text color="fg.muted">
                  Check your email and click the link to continue.
                </Text>
              </Box>
            </Stack>
            <Stack hidden={success} spacing="6">
              <Button colorScheme="teal" onClick={onForgotPasswordClick}>
                Send link to email
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
