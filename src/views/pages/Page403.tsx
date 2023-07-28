import { Box, Flex, Stack } from "@chakra-ui/react";
import React, { ReactElement } from "react";

const Page403 = (): ReactElement => {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        <Box maxW="sm">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">403</h1>
            <h4 className="pt-3">Unauthorized</h4>
            <p className="text-muted float-left">You shall not pass!</p>
          </div>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Page403;
