import React from "react";

import LandingHeader from "./LandingHeader";
import LandingContent from "./LandingContent";
import LandingFooter from "./LandingFooter";
import { Flex } from "@chakra-ui/react";

const LandingLayout = () => {
  return (
    <Flex direction="column" flex="1">
        <LandingHeader />
        <LandingContent />
        <LandingFooter />
    </Flex>
  );
};

export default LandingLayout;
