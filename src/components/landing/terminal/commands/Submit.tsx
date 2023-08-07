import { Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { cookieService } from "../../../../services/CookieService";
import ApiCalls from "../../../../domain/common/api/ApiCalls";

interface Props {
  argument: string;
}

const Submit = ({ argument }: Props) => {
  const triggered = useRef<boolean>(false);

  const [message, setMessage] = useState("Submitting...");
  const [color, setColor] = useState("red.400");
  
  useEffect(() => {
    if (!triggered.current) {
      submitFlag(argument);
      triggered.current = true;
    }
  }, []);

  const submitFlag = async (flag: string) => {
    try {
      if (cookieService.isAuthenticated()) {
        await ApiCalls.submitFlag(flag);
        setMessage("Successful submit. Well done!");
        setColor("green.400");
      } else {
        setMessage("Error: you need to authenticate first");
      }
    } catch (err) {
      setMessage("Error: invalid flag");
    }
  };

  return (
    <Flex flex={"1"} as="span" color={`${color}`}>
      {message}
    </Flex>
  );
};

export default Submit;
