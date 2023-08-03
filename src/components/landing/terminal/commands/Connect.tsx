import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { socialMedia } from "./Social";
import { Code } from "@chakra-ui/react";

interface Props {
  social: string;
}

const ErrorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1.8em;
  .error {
    color: #ff8b8b;
    font-weight: bold;
    line-height: 2em;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform:rotate(360deg)
  }
`;

const Spinner = styled.span`
  margin-left: 1em;
  animation: ${rotate} 2s linear infinite;
`;

const Connect = ({ social }: Props) => {
  const [feedBack, setFeedBack] = useState({
    loading: false,
    error: false,
  });

  const findUrl = useCallback(() => {
    const redirectUrl = socialMedia.find(
      (item) => item.site.toLowerCase() === social?.toLowerCase()
    )?.url;

    return redirectUrl;
  }, [social]);

  const redirect = useCallback(() => {
    const redirectUrl = findUrl();

    if (redirectUrl) {
      setFeedBack({ loading: true, error: false });

      const id = setTimeout(() => window.open(redirectUrl), 1500);

      return () => clearTimeout(id);
    } else {
      setFeedBack({ loading: false, error: true });
    }
  }, [findUrl]);

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <>
      {feedBack.error && (
        <ErrorContainer>
          <span className="error">
            Error while connecting to the given social media!
          </span>
          <span>
            Remember to pass a valid social media as parameter to the{" "}
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal">
              connect
            </Code>{" "}
            command, like this:
          </span>
          <span>
            E.g:{" "}
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal">
              connect instagram
            </Code>
          </span>
          <span>
            To see the list of available social media, type{" "}
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal">
              social
            </Code>
            ,
          </span>
          <span>
            To see the list of all available commands, type{" "}
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal">
              help
            </Code>
          </span>
        </ErrorContainer>
      )}
      {feedBack.loading && (
        <LoadingContainer>
          <span>Connecting to {social}</span>
          <Spinner>+</Spinner>
        </LoadingContainer>
      )}
    </>
  );
};

export default React.memo(Connect);
