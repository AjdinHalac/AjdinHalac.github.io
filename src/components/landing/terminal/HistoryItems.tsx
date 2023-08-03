import Path from "./Path";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Box, Flex } from "@chakra-ui/react";

interface Props {
  user: string;
  path: string;
  inputValue: string;
}

const HistoryItems = ({ user, path, inputValue }: Props) => {
  return (
    <>
      <Path user={user} path={path} />
      <Flex>
        <HiOutlineArrowNarrowRight size={23} />
        <Box as="span">{inputValue}</Box>
      </Flex>
    </>
  );
};

export default HistoryItems;
