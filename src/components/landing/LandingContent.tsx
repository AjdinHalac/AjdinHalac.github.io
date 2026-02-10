import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react";

const Home = React.lazy(() => import("../../views/landing/Home"));
const BlogDetails = React.lazy(() => import("../../views/landing/BlogDetails"));
const Blog = React.lazy(() => import("../../views/landing/Blog"));
const ToolsJSONFormatter = React.lazy(
  () => import("../../views/landing/ToolsJSONFormatter"),
);
const ToolsJSONToGo = React.lazy(
  () => import("../../views/landing/ToolsJSONToGo"),
);
const ToolsJWTParser = React.lazy(
  () => import("../../views/landing/ToolsJWTParser"),
);
const ToolsBase64 = React.lazy(() => import("../../views/landing/ToolsBase64"));
const ToolsBase64ToImage = React.lazy(
  () => import("../../views/landing/ToolsBase64ToImage"),
);
const ToolsStringDiff = React.lazy(
  () => import("../../views/landing/ToolsStringDiff"),
);
const ToolsStringCount = React.lazy(
  () => import("../../views/landing/ToolsStringCount"),
);
const SignIn = React.lazy(() => import("../../views/landing/SignIn"));
const SignUp = React.lazy(() => import("../../views/landing/SignUp"));
const Profile = React.lazy(() => import("../../views/landing/Profile"));
const Terminal = React.lazy(() => import("../../views/landing/Terminal"));

const AcceptInvite = React.lazy(
  () => import("../../views/landing/AcceptInvite"),
);
const ForgotPassword = React.lazy(
  () => import("../../views/landing/ForgotPassword"),
);
const ResetPassword = React.lazy(
  () => import("../../views/landing/ResetPassword"),
);
const ConfirmEmail = React.lazy(
  () => import("../../views/landing/ConfirmEmail"),
);
const Page403 = React.lazy(() => import("../../views/pages/Page403"));
const Page404 = React.lazy(() => import("../../views/pages/Page404"));

const LoadingFallback = () => (
  <Center minH="60vh" className="animate-fade-in">
    <VStack spacing={4}>
      <Spinner
        size="xl"
        color="teal.400"
        thickness="4px"
        speed="0.8s"
        emptyColor="gray.700"
      />
      <Text color="gray.500" fontSize="sm" fontWeight="500">
        Loading...
      </Text>
    </VStack>
  </Center>
);

const LandingContent = () => {
  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py="16"
      minHeight="94vh"
    >
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/tools/json-formatter"
            element={<ToolsJSONFormatter />}
          />
          <Route path="/tools/json-to-go" element={<ToolsJSONToGo />} />
          <Route path="/tools/jwt-parser" element={<ToolsJWTParser />} />
          <Route path="/tools/base64" element={<ToolsBase64 />} />
          <Route
            path="/tools/base64-to-image"
            element={<ToolsBase64ToImage />}
          />
          <Route path="/tools/stringcount" element={<ToolsStringCount />} />
          <Route path="/tools/stringdiff" element={<ToolsStringDiff />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
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
      </Suspense>
    </Flex>
  );
};

export default LandingContent;
