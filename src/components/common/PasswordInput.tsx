import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface IPasswordInputProps extends InputProps {
  label: string;
}

export const PasswordField = forwardRef<HTMLInputElement, IPasswordInputProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    return (
      <FormControl>
        <FormLabel htmlFor="password">{props.label}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              color={"teal.500"}
              variant="text"
              aria-label={isOpen ? "Hide" : "Show"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? "text" : "password"}
            autoComplete="current-password"
            required
            {...props}
          />
        </InputGroup>
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";
