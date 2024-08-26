import { Avatar, Badge, Box, Container, Flex, HStack, Heading, Icon, Image, SimpleGrid, Stack, Text, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { IArticle, ITag } from "../../domain/common/interfaces";
import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { Link, useParams } from "react-router-dom";
import Markdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { CalendarIcon } from "@chakra-ui/icons";


const BlogDetails = (): ReactElement => {
  const toast = useToast();
  const params = useParams()

  const [article, setArticle] = useState<IArticle>();

  const getArticle = async (slug: string) => {
    try {
      const response = await ApiCalls.getArticle(slug);
      setArticle(response.data);
    } catch (err) {
      toast({
        title: parseError(err),
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
      return window.location.replace("/#/not-found");
    }
  };

  useEffect(() => {
    if (!params.slug) {
      return window.location.replace("/#/not-found");
    }
    getArticle(params.slug);
  }, []);

  function getLocale() {
    return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
  }

  var locale = getLocale();
  var format = new Intl.DateTimeFormat(
    locale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  return (
    <Flex direction={"column"}>
      <Container maxW={"4xl"} id="blog-details">
        <Stack
          as={Box}
          spacing={{ base: 4, md: 6 }}
          pt={{ base: 10 }}
          pb={{ base: 10 }}
        >
          <Heading fontWeight={600}>{article?.title}</Heading>
          <Text color={"gray.600"} fontSize={"lg"} px={4}>
            {article?.description}
          </Text>
          <Image maxHeight={"40vh"} width={"100%"} objectFit="cover" src={article?.image} />
          <SimpleGrid px={4} spacing={4} columns={{ base: 1, md: 2 }}>
            <HStack>
              <Avatar boxSize={10} name='Ajdin Halac' src='https://media.licdn.com/dms/image/v2/D4D03AQEAdT2dha2OJQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721716686255?e=2147483647&v=beta&t=yqvil96C3YIDJyVQOU7QvnwqWOL6BFiC66Hvoy70-zM' />
              <Box as="span">
                <Text>by&nbsp;<Link to="https://github.com/AjdinHalac" style={{ textDecoration: "underline" }}>Ajdin Halac</Link></Text>
              </Box>
            </HStack>
            <HStack>
              <Icon boxSize={10} as={CalendarIcon} />
              <Box as="span">
                <Text>{article?.publishedAt ? format.format(new Date(article?.publishedAt)) : null}</Text>
              </Box>
            </HStack>
          </SimpleGrid>
        </Stack>
        <Stack
          as={Box}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 10, md: 36 }}
        >
          <Markdown components={ChakraUIRenderer()} children={article?.content} />;
        </Stack>

        <Heading size='md'>Tags</Heading>
        <Wrap py={2} spacing={2}>
          {article?.tags ? article.tags.map((tag: ITag) => (
            <WrapItem>
              <Badge key={tag.tag} colorScheme={"teal"}>
                {tag.tag}
              </Badge>
            </WrapItem>
          )) : null
          }
        </Wrap>
      </Container>
    </Flex >
  );
};

export default BlogDetails;
