import React, { useLayoutEffect } from "react";

import { cookieService } from "../../services/CookieService";

import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";
import { Flex } from "@chakra-ui/react";

const AdminLayout = () => {
  useLayoutEffect(() => {
    if (!cookieService.isAdmin()) {
      return window.location.replace("/#/unauthorized");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Flex>
      <AdminSidebar />
      <AdminContent />
    </Flex>
  );
};

export default AdminLayout;
