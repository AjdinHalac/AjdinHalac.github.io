import { ReactElement, useEffect, useState } from "react";

import ApiCalls from "../../domain/common/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../../components/common/PasswordInput";
import { cookieService } from "../../services/CookieService";
import { IUser } from "../../domain/common/interfaces";

const Profile = (): ReactElement => {
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  if (!cookieService.isAuthenticated()) {
    window.location.replace("/#/");
  }

  const [user, setUser] = useState<Partial<IUser>>({
    firstName: "",
    lastName: "",
    profileImage: "",
  });
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const getUser = async () => {
    try {
      const response = await ApiCalls.getMe();
      setUser(response.data);
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

  const sudoPassword = async () => {
    try {
      const response = await ApiCalls.sudoPassword(currentPassword);
      setToken(response.data);
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

  const deleteAccount = async () => {
    try {
      await ApiCalls.deleteMe(token);
      toast({
        title: "Account deleted",
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

  const changePassword = async () => {
    try {
      await ApiCalls.changePassword(token, password);
      toast({
        title: "Password changed",
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

  const changeNotifications = async (receiveNotifications: boolean) => {
    try {
      const response = await ApiCalls.updateMe({
        payload: {
          receiveNotifications: receiveNotifications,
        },
      });
      toast({
        title: receiveNotifications
          ? "Notifications enabled"
          : "Notifications disabled",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
      setUser(response.data);
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

  const updateUser = async () => {
    try {
      const response = await ApiCalls.updateMe({
        payload: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
      setUser(response.data);
      toast({
        title: "User updated",
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

  const showDeleteAccountAlert = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteAccount();
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "";

  return (
    <Container
      maxW="2xl"
      py={{ base: "8", md: "12" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8" className="animate-fade-in-up">
        {/* Avatar Section */}
        <Center>
          <Box position="relative">
            <Avatar
              size="2xl"
              name={displayName}
              cursor="pointer"
              src={user?.profileImage || "avatar.jpg"}
              ring="4px"
              ringColor="teal.400"
              ringOffset="4px"
              ringOffsetColor={cardBg}
            />
            <Box
              position="absolute"
              bottom={1}
              right={1}
              w={5}
              h={5}
              borderRadius="full"
              bg="green.400"
              border="3px solid"
              borderColor={cardBg}
            />
          </Box>
        </Center>
        <Stack spacing={1} textAlign="center">
          <Heading size={{ base: "sm", md: "md" }}>
            {displayName || "User Profile"}
          </Heading>
          {user?.email && (
            <Text color={subtitleColor} fontSize="sm">
              {user.email}
            </Text>
          )}
        </Stack>
      </Stack>

      {/* Tabs Section */}
      <Box
        mt={8}
        bg={cardBg}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 20px 60px -15px rgba(0,0,0,0.1)"
        overflow="hidden"
        className="animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        <Tabs colorScheme="teal" isFitted>
          <TabList borderBottom="1px solid" borderColor={borderColor}>
            <Tab
              py={4}
              fontWeight="600"
              fontSize="sm"
              _selected={{
                color: "teal.400",
                borderColor: "teal.400",
                borderBottomWidth: "3px",
              }}
            >
              Basic Information
            </Tab>
            <Tab
              py={4}
              fontWeight="600"
              fontSize="sm"
              _selected={{
                color: "teal.400",
                borderColor: "teal.400",
                borderBottomWidth: "3px",
              }}
            >
              Account Management
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={{ base: 4, md: 8 }}>
              <Stack spacing="6">
                <FormControl id="firstName">
                  <FormLabel fontSize="sm" fontWeight="600">
                    First Name
                  </FormLabel>
                  <Input
                    type="text"
                    borderRadius="xl"
                    value={user?.firstName}
                    onChange={(e: any) =>
                      setUser({ ...user, firstName: e.currentTarget.value })
                    }
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
                    }}
                  />
                </FormControl>
                <FormControl id="lastName">
                  <FormLabel fontSize="sm" fontWeight="600">
                    Last Name
                  </FormLabel>
                  <Input
                    type="text"
                    borderRadius="xl"
                    value={user?.lastName}
                    onChange={(e: any) =>
                      setUser({ ...user, lastName: e.currentTarget.value })
                    }
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
                    }}
                  />
                </FormControl>
                <FormControl id="emailAddress">
                  <FormLabel fontSize="sm" fontWeight="600">
                    Email Address
                  </FormLabel>
                  <Input
                    type="email"
                    disabled
                    borderRadius="xl"
                    value={user?.email}
                    opacity={0.6}
                    onChange={(e: any) =>
                      setUser({ ...user, email: e.currentTarget.value })
                    }
                  />
                </FormControl>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <FormLabel
                    htmlFor="notificationEmails"
                    mb={0}
                    cursor="pointer"
                    userSelect="none"
                    fontSize="sm"
                    fontWeight="600"
                  >
                    Receive notification emails
                  </FormLabel>
                  <Switch
                    id="notificationEmails"
                    colorScheme="teal"
                    checked={user.receiveNotifications}
                    onChange={(e: any) =>
                      changeNotifications(e.currentTarget.checked)
                    }
                  />
                </FormControl>
                <Button
                  colorScheme="teal"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="700"
                  onClick={updateUser}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
                  }}
                >
                  Save Changes
                </Button>
              </Stack>
            </TabPanel>

            <TabPanel p={{ base: 4, md: 8 }}>
              <Stack hidden={!!token} spacing="6">
                <Box textAlign="center" py={4}>
                  <Heading size="sm" mb={2}>
                    Verify your identity
                  </Heading>
                  <Text fontSize="sm" color={subtitleColor}>
                    We need to confirm your identity before you proceed.
                  </Text>
                </Box>
                <PasswordField
                  label="Current Password"
                  value={currentPassword}
                  onChange={(e: any) =>
                    setCurrentPassword(e.currentTarget.value)
                  }
                />
                <Button
                  colorScheme="teal"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="700"
                  onClick={sudoPassword}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
                  }}
                >
                  Continue
                </Button>
              </Stack>

              <Stack hidden={!token} spacing="6">
                <PasswordField
                  label="New Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.currentTarget.value)}
                />
                <Button
                  colorScheme="teal"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="700"
                  onClick={changePassword}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
                  }}
                >
                  Change Password
                </Button>
                <Divider borderColor={borderColor} />
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="lg"
                  borderRadius="xl"
                  fontWeight="700"
                  onClick={showDeleteAccountAlert}
                  _hover={{
                    bg: "red.50",
                    transform: "translateY(-2px)",
                  }}
                >
                  Delete Account
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Profile;
