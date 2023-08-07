import React, { useCallback, useEffect, useState } from "react";
import { socialMedia } from "./Social";
import { Code, Flex, Spinner, VStack } from "@chakra-ui/react";

interface Props {
  social: string;
}

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
        <VStack my={2} align={"left"}>
          <Flex as="span">
            Remember to pass a valid social media as parameter to the
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal" mx={1}>
              connect
            </Code>
            command, like this:
          </Flex>
          <Flex as="span">
            E.g:
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal" mx={1}>
              connect github
            </Code>
          </Flex>
          <Flex as="span">
            To see the list of available social media, type
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal" mx={1}>
              social
            </Code>
            ,
          </Flex>
          <Flex as="span">
            To see the list of all available commands, type
            <Code borderRadius={"5px"} fontWeight={"bold"} colorScheme="teal" mx={1}>
              help
            </Code>
          </Flex>
        </VStack>
      )}
      {feedBack.loading && (
        <Flex as="span">
          <Flex as="span" mr={2}>Connecting to {social}</Flex>
          <Spinner />
        </Flex>
      )}
    </>
  );
};

export default React.memo(Connect);
