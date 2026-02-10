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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../components/common/Logo";
import { PasswordField } from "../../components/common/PasswordInput";
import { cookieService } from "../../services/CookieService";

const SignUp = (): ReactElement => {
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");

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
        newCredentials?.data?.refreshToken,
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
      <Stack spacing="8" className="animate-fade-in-up">
        <Stack spacing="6">
          <Logo color="teal.500" />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "sm", md: "md" }} className="gradient-text">
              Create an account
            </Heading>
            <Text color="gray.500">
              Already have an account?{" "}
              <Box as="span" color="teal.400" fontWeight="600">
                <Link to="/signin">Sign in</Link>
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
              <FormControl>
                <FormLabel htmlFor="email" fontSize="sm" fontWeight="600">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  borderRadius="xl"
                  size="lg"
                  onChange={(e: any) => setEmail(e.currentTarget.value)}
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
                  }}
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
                colorScheme="teal"
                isChecked={tos}
                onChange={(e: any) => setTos(e.currentTarget.checked)}
                my={2}
              >
                <Text fontSize="sm" color="gray.500">
                  I agree to the{" "}
                  <Box as="span" color="teal.400" fontWeight="600">
                    <Link to="/tos">Terms of service</Link>
                  </Box>
                </Text>
              </Checkbox>
            </HStack>
            <Stack spacing="4">
              <Button
                colorScheme="teal"
                size="lg"
                borderRadius="xl"
                fontWeight="700"
                onClick={onRegisterClick}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
                }}
              >
                Create account
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUp;
