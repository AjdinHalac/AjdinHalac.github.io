import { ReactElement, useEffect, useState } from "react";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { Logo } from "../../components/common/Logo";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const ConfirmEmail = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToast();

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
  }, []);

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
              Confirm your email
            </Heading>
            <Text color="fg.muted">
              This is an automated process, please wait...
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
              <Box hidden={success}>
                <Center color={"teal.500"}>
                  <AiOutlineCloseCircle size={"6rem"} />
                </Center>
                <Heading my={2} size={{ base: "xs", md: "sm" }}>
                  Confirming your email
                </Heading>
                <Text color="fg.muted">Don't close this page.</Text>
              </Box>
              <Box hidden={!success}>
                <Center color={"teal.500"}>
                  <AiOutlineCheckCircle size={"6rem"} />
                </Center>
                <Heading my={2} size={{ base: "xs", md: "sm" }}>
                  Email confirmed
                </Heading>
                <Text color="fg.muted">
                  You can close this page now. {" "}
                  <Box as="span" color={"teal.500"}>
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
