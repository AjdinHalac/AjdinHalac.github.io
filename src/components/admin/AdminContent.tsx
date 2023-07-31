import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("../../views/admin/Dashboard"));
const Users = React.lazy(() => import("../../views/admin/Users"));
const User = React.lazy(() => import("../../views/admin/User"));
const UserRoles = React.lazy(() => import("../../views/admin/UserRoles"));
const Articles = React.lazy(() => import("../../views/admin/Articles"));
const Article = React.lazy(() => import("../../views/admin/Article"));
const CreateArticle = React.lazy(
  () => import("../../views/admin/CreateArticle")
);
const Tags = React.lazy(() => import("../../views/admin/Tags"));
const Tag = React.lazy(() => import("../../views/admin/Tag"));
const CreateTag = React.lazy(() => import("../../views/admin/CreateTag"));
const TosList = React.lazy(() => import("../../views/admin/TosList"));
const Tos = React.lazy(() => import("../../views/admin/Tos"));
const CreateTos = React.lazy(() => import("../../views/admin/CreateTos"));
const Page404 = React.lazy(() => import("../../views/pages/Page404"));

const AdminContent = () => {
  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py="16"
      minHeight={"94vh"}
    >
      <Container flex="1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/:id/roles" element={<UserRoles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:id" element={<Tag />} />
          <Route path="/create-tag" element={<CreateTag />} />
          <Route path="/tos" element={<TosList />} />
          <Route path="/tos/:id" element={<Tos />} />
          <Route path="/create-tos" element={<CreateTos />} />
          <Route path={"*"} element={<Page404 />} />
        </Routes>
      </Container>
    </Flex>
  );
};

export default React.memo(AdminContent);
