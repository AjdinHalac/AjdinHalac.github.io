import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

interface Props {
  inputValue: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CommandInput = React.forwardRef<HTMLInputElement, Props>(
  ({ inputValue, changeHandler, submitHandler }, ref) => {
    return (
      <Flex >
        <form style={{width: "100%"}} onSubmit={(e) => submitHandler(e)} data-testid="terminalForm">
          <InputGroup
                      >
            <InputLeftElement pointerEvents="none">
              <HiArrowNarrowRight size={23} />
            </InputLeftElement>
            <Input
              data-testid="terminalInput"
              spellCheck="false"
              ref={ref}
              type="text"
              autoFocus={true}
              value={inputValue}
              onChange={(e) => changeHandler(e)}
              borderColor={"transparent"}
              focusBorderColor="transparent"
              _hover={{borderColor: "transparent"}}
            />
          </InputGroup>
        </form>
      </Flex>
    );
  }
);

export default React.memo(CommandInput);
