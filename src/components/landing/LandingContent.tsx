import React from "react";
import { Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

const Home = React.lazy(() => import("../../views/landing/Home"));
const About = React.lazy(() => import("../../views/landing/About"));
const Blog = React.lazy(() => import("../../views/landing/Blog"));
const SignIn = React.lazy(() => import("../../views/landing/SignIn"));
const SignUp = React.lazy(() => import("../../views/landing/SignUp"));
const Profile = React.lazy(() => import("../../views/landing/Profile"));
const Contact = React.lazy(() => import("../../views/landing/Contact"));
const Terminal = React.lazy(() => import("../../views/landing/Terminal"));

const AcceptInvite = React.lazy(
  () => import("../../views/landing/AcceptInvite")
);
const ForgotPassword = React.lazy(
  () => import("../../views/landing/ForgotPassword")
);
const ResetPassword = React.lazy(
  () => import("../../views/landing/ResetPassword")
);
const ConfirmEmail = React.lazy(
  () => import("../../views/landing/ConfirmEmail")
);
const Page403 = React.lazy(() => import("../../views/pages/Page403"));
const Page404 = React.lazy(() => import("../../views/pages/Page404"));

const LandingContent = () => {
  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py="16"
      minHeight={"94vh"}
    >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/accept-invite" element={<AcceptInvite />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path={"/unauthorized"} element={<Page403 />} />
          <Route path={"*"} element={<Page404 />} />
        </Routes>
    </Flex>
  );
};

export default React.memo(LandingContent);
