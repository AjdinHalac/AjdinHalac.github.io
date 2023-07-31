import React, { useState, useEffect } from "react";

import { parseError } from "../../utils/helpers";
import { IRole } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { useToast } from "@chakra-ui/react";

const UserRoles = ({ match }: any) => {
  const toast = useToast();
  const [userRoles, setUserRoles] = useState<IRole[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);

  const userHasRole = (roleID: number): boolean => {
    return !!userRoles.find((r) => r.id === roleID);
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

  const addUserRole = async (uuid: string, roleID: number) => {
    try {
      await ApiCalls.addUserRole(uuid, roleID);
      loadData();
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
      loadData();
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

  const loadData = async () => {
    await getRoles();
    await getUserRoles(match.params.id);
  };

  useEffect(() => {
    loadData();
    //eslint-disable-next-line
  }, []);

  return <>User roles</>;
};

export default UserRoles;
