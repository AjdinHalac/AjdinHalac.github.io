import React, { useEffect, useState } from "react";

import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { IRole, IUser } from "../../domain/common/interfaces";
import { Badge, Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const User = () => {
  const toast = useToast();
  const params = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user, setUser] = useState<Partial<IUser>>();
  const [userRoles, setUserRoles] = useState<IRole[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);

  const getUser = async (uuid: string) => {
    try {
      const responseUser = await ApiCalls.getUserById(uuid);
      setUser(responseUser.data);
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
      if (!params.uuid) {
        return
      }
      await ApiCalls.updateUser(params.uuid, {
        payload: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          profileImage: user?.profileImage,
          bio: user?.bio,
        },
      });
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

  const getRoles = async () => {
    try {
      const response = await ApiCalls.getRoles();
      setRoles(response.data);
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

  const getUserRoles = async (uuid: string) => {
    try {
      const response = await ApiCalls.getUserRoles(uuid);
      setUserRoles(response.data);
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

  const toggleSelection = (role: IRole) => {
    if (!params.uuid) {
      return window.location.replace("/#/admin/users");
    }

    if (userRoles.map(userRole => userRole.id).includes(role.id)) {
      removeUserRole(params.uuid, role.id);
      setUserRoles(userRoles.filter(userRole => userRole.id !== role.id));
    } else {
      addUserRole(params.uuid, role.id);
      setUserRoles([...userRoles, role]);
    }
  };

  const addUserRole = async (uuid: string, roleID: number) => {
    try {
      await ApiCalls.addUserRole(uuid, roleID);
      toast({
        title: "Role added",
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

  const removeUserRole = async (uuid: string, roleID: number) => {
    try {
      await ApiCalls.removeUserRole(uuid, roleID);
      toast({
        title: "Role removed",
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
    if (!params.uuid) {
      return window.location.replace("/#/admin/users");
    }
    getUser(params.uuid);
    getUserRoles(params.uuid);
    getRoles();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Roles</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {roles.map((role: IRole) => (
              <VStack>
                <Badge
                  key={role.id}
                  colorScheme={userRoles?.map(userRole => userRole.id).includes(role.id) ? "teal" : "gray"}
                  cursor="pointer"
                  mr={2}
                  mb={2}
                  onClick={() => toggleSelection(role)}
                >
                  {role.name}
                </Badge>
              </VStack>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack mb={4}>
        <Heading size="md">User</Heading>
        <Button
          onClick={() => updateUser()}
        >
          Save
        </Button>
        <FormControl>
          <Button
            color="secondary"
            onClick={onOpen}
          >
            Roles
          </Button>
        </FormControl>
      </HStack>
      <Box px={2} height="87vh" overflowY={"scroll"}>
        <VStack spacing={2}>
          <FormControl>
            <FormLabel>UUID</FormLabel>
            <Input
              type="text"
              disabled
              value={user?.uuid}
            />
          </FormControl>

          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={user?.firstName}
              onChange={(e: any) => setUser({ ...user, firstName: e.currentTarget.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={user?.lastName}
              onChange={(e: any) => setUser({ ...user, lastName: e.currentTarget.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Profile Image</FormLabel>
            <Input
              type="text"
              value={user?.profileImage}
              onChange={(e: any) => setUser({ ...user, profileImage: e.currentTarget.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              value={user?.bio}
              onChange={(e: any) => setUser({ ...user, bio: e.currentTarget.value })}
            />
          </FormControl>

        </VStack>
      </Box>
    </Box>
  );
};

export default User;
