import React, { ReactElement, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import ApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ajaxService } from "../../services/AjaxService";
import { cookieService } from "../../services/CookieService";
import { Logo } from "../../components/common/Logo";
import { PasswordField } from "../../components/common/PasswordInput";

const AcceptInvite = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToast();

  if (cookieService.isAuthenticated()) {
    window.location.replace("/#/");
  }

  const [password, setPassword] = useState<string>("");
  const [tos, setTos] = useState<boolean>(false);

  const onAcceptInviteClick = async () => {
    try {
      const newCredentials = await ApiCalls.acceptInvite({
        payload: { token: token ? token : "invalid", password: password },
      });

      ajaxService.setAuthToken(
        newCredentials?.data?.accessToken,
        newCredentials?.data?.refreshToken
      );
      window.location.replace("/#/");
    } catch (err) {
		toast({
			title: parseError(err),
			position: 'top-right',
			duration: 5000,
			isClosable: true,
			status: 'error',
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
              Accept invite
            </Heading>
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
              <FormControl >
                <PasswordField
                  label="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.currentTarget.value)}
                />
              </FormControl>
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
              <Button colorScheme="teal" onClick={onAcceptInviteClick}>Accept invite</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default AcceptInvite;
