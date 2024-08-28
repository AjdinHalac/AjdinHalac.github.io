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
  useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../../components/common/PasswordInput";
import { cookieService } from "../../services/CookieService";
import { IUser } from "../../domain/common/interfaces";

const Profile = (): ReactElement => {
  const toast = useToast();

  if (!cookieService.isAuthenticated()) {
    window.location.replace("/");
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
        }
      });
      if (receiveNotifications) {
        toast({
          title: "Notifications enabled",
          position: "top-right",
          duration: 5000,
          isClosable: true,
          status: "success",
        });
      } else {
        toast({
          title: "Notifications disabled",
          position: "top-right",
          duration: 5000,
          isClosable: true,
          status: "success",
        });
      }
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
        }
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
    if (window.confirm('Are you sure you want to delete your account?')) {
      deleteAccount()
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      maxW="2xl"
      py={{ base: "8", md: "12" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Center>
          <Avatar
            size="2xl"
            color={"teal.500"}
            name={(user?.firstName && user?.lastName) ? (user?.firstName + " " + user?.lastName) : ""}
            cursor="pointer"
            src={user?.profileImage ? user?.profileImage : 'avatar.jpg'}
          >
          </Avatar>
        </Center>
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={{ base: "xs", md: "sm" }}>{(user?.firstName && user?.lastName) ? (user?.firstName + " " + user?.lastName) : "User Profile"}</Heading>
        </Stack>
      </Stack>
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg.surface" }}
      >
        <Tabs>
          <Center>
            <TabList px={5}>
              <Tab
                mx={3}
                px={0}
                py={3}
                fontWeight="semibold"
                color="brand.cadet"
                borderBottomWidth={1}
                _active={{ bg: 'transparent' }}
              >
                Basic Information
              </Tab>
              <Tab
                mx={3}
                px={0}
                py={3}
                fontWeight="semibold"
                color="brand.cadet"
                borderBottomWidth={1}
                _active={{ bg: 'transparent' }}
              >
                Account Management
              </Tab>
            </TabList>
          </Center>

          <TabPanels px={3} mt={2}>
            <TabPanel>
              <Stack spacing="6">
                <FormControl id="firstName">
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" value={user?.firstName}
                    onChange={(e: any) =>
                      setUser({ ...user, firstName: e.currentTarget.value })
                    }
                  />
                </FormControl>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" value={user?.lastName}
                    onChange={(e: any) =>
                      setUser({ ...user, lastName: e.currentTarget.value })
                    }
                  />
                </FormControl>
                <FormControl id="emailAddress">
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    disabled
                    value={user?.email}
                    onChange={(e: any) =>
                      setUser({ ...user, email: e.currentTarget.value })
                    }
                  />
                </FormControl>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel
                    htmlFor="notificationEmails"
                    mb={0}
                    cursor="pointer"
                    userSelect="none"
                  >
                    Receive notification emails
                  </FormLabel>
                  <Switch id="notificationEmails" checked={user.receiveNotifications} onChange={(e: any) => changeNotifications(e.currentTarget.checked)} />
                </FormControl>
                <Stack spacing="6">
                  <Button colorScheme="teal" onClick={updateUser}>
                    Save Changes
                  </Button>
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack hidden={!!token} spacing="6">
                <Heading size={{ base: "xs", md: "sm" }}>
                  We need to confirm your identity before you proceed.
                </Heading>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <PasswordField
                    label="Current Password"
                    value={currentPassword}
                    onChange={(e: any) => setCurrentPassword(e.currentTarget.value)}
                  />
                </FormControl>
                <Stack spacing="6">
                  <Button colorScheme="teal" onClick={sudoPassword}>
                    Continue
                  </Button>
                </Stack>
              </Stack>
              <Stack hidden={!token} spacing="6">
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <PasswordField
                    label="New Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.currentTarget.value)}
                  />
                </FormControl>
                <Stack spacing="6">
                  <Button colorScheme="teal" onClick={changePassword}>
                    Change Password
                  </Button>
                </Stack>
                <Divider orientation="horizontal" />
                <Stack spacing="6">
                  <Button colorScheme="red" onClick={showDeleteAccountAlert}>
                    Delete Account
                  </Button>
                </Stack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container >
  );
};

export default Profile;
