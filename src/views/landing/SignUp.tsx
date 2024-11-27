import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

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
import { Logo } from "../../components/common/Logo";
import { PasswordField } from "../../components/common/PasswordInput";
import { cookieService } from "../../services/CookieService";

const SignUp = (): ReactElement => {
  const toast = useToast();

  if (cookieService.isAuthenticated()) {
    window.location.replace("/#/");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [tos, setTos] = useState<boolean>(false);

  const onRegisterClick = async () => {
    try {
      const newCredentials = await ApiCalls.register({
        payload: { email, password: password },
      });
      ajaxService.setAuthToken(
        newCredentials?.data?.accessToken,
        newCredentials?.data?.refreshToken
      );
      window.location.replace("/#/");
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
            <Heading size={{ base: "xs", md: "sm" }}>Create an account</Heading>
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
                isChecked={tos}
                onChange={(e: any) => setTos(e.currentTarget.checked)}
                my={2}
              >
                <Text color="fg.muted">
                  I agree to the{" "}
                  <Box as="span" color={"teal.500"}>
                    <Link to="/tos">Terms of service</Link>
                  </Box>
                </Text>
              </Checkbox>
            </HStack>
            <Stack spacing="6">
              <Button colorScheme="teal" onClick={onRegisterClick}>
                Create account
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

export default SignUp;
