import React, { useLayoutEffect } from "react";

import { cookieService } from "../../services/CookieService";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminContent from "./AdminContent";
import { Flex } from "@chakra-ui/react";

const AdminLayout = () => {
  useLayoutEffect(() => {
    if (!cookieService.isAdmin()) {
      return window.location.replace("/unauthorized");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Flex direction="column" flex="1">
      <AdminSidebar />
      <AdminHeader />
      <AdminContent />
    </Flex>
  );
};

export default AdminLayout;
