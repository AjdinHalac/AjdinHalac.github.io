import React from "react";

import LandingHeader from "./LandingHeader";
import LandingContent from "./LandingContent";
import LandingFooter from "./LandingFooter";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const LandingLayout = () => {
  return (
    <Flex direction="column" flex="1" minH="100vh">
      <LandingHeader />
      <Box
        flex="1"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          pointerEvents: "none",
          backgroundImage: useColorModeValue(
            "radial-gradient(circle at 20% 50%, rgba(49, 151, 149, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(49, 151, 149, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(49, 151, 149, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(49, 151, 149, 0.04) 0%, transparent 50%)",
          ),
        }}
      >
        <LandingContent />
      </Box>
      <LandingFooter />
    </Flex>
  );
};

export default LandingLayout;
