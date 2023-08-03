import { Flex } from "@chakra-ui/react";

interface Props {
  message?: string;
  color?: string;
}

const Echo = ({ message = "", color = "green.400" }: Props) => {
  if (message.startsWith("Error:")) color = "red.400";
  return (
    <Flex flex={"1"} as="span" color={`${color}`}>
      {message}
    </Flex>
  );
};

export default Echo;
