import { Box, Flex } from "@chakra-ui/react";

interface Props {
  user: string;
  path: string;
}

const SubmitFlag = ({ user, path }: Props) => {

  return (
    <Flex>
      <Box color={"teal"} mr={"0.3em"} as="span">
        {user}
      </Box>
      <Box mr={"0.3em"} as="span">
        in
      </Box>
      <Box color={"yellow"} mr={"0.3em"} as="span">
        {path}
      </Box>
    </Flex>
  );
};

export default SubmitFlag;
