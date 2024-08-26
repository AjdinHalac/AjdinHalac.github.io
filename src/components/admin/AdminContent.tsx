import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("../../views/admin/Dashboard"));
const Users = React.lazy(() => import("../../views/admin/Users"));
const User = React.lazy(() => import("../../views/admin/User"));
const Articles = React.lazy(() => import("../../views/admin/Articles"));
const Article = React.lazy(() => import("../../views/admin/Article"));
const Tags = React.lazy(() => import("../../views/admin/Tags"));
const Tos = React.lazy(() => import("../../views/admin/Tos"));
const CreateTos = React.lazy(() => import("../../views/admin/CreateTos"));
const Page404 = React.lazy(() => import("../../views/pages/Page404"));

const AdminContent = () => {
  return (
    <Flex
      role="main"
      direction="column"
      flex="1"
      p="8"
    >
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:uuid" element={<User />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/create-tos" element={<CreateTos />} />
        <Route path={"*"} element={<Page404 />} />
      </Routes>
    </Flex>
  );
};

export default React.memo(AdminContent);
