import { ReactElement } from "react";

import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

const Page404 = (): ReactElement => {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        <Box maxW="sm">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">404</h1>
            <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
            <p className="text-muted float-left">
              The page you are looking for was not found.
            </p>
          </div>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon name="cil-magnifying-glass" />
            </InputLeftElement>
            <Input
              size="16"
              type="text"
              placeholder="What are you looking for?"
            />
            <InputRightElement>
              <Button colorScheme="blue">Search</Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Page404;
