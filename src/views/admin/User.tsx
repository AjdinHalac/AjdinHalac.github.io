import React, { useEffect, useState } from "react";

import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { IUser } from "../../domain/common/interfaces";
import { useToast } from "@chakra-ui/react";

const User = ({ match }: any) => {
  const toast = useToast();
  const [user, setUser] = useState<IUser>();

  const getUser = async () => {
    try {
      const responseUser = await ApiCalls.getUserById(match.params.id);
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

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return <div />;
  }

  return <>User</>;
};

export default User;
