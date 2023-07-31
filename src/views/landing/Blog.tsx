import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Fade,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError, truncate } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { IArticle, ITag } from "../../domain/common/interfaces";

const Blog = (): ReactElement => {
  const toast = useToast();

  const [articles, setArticles] = useState<IArticle[]>([]);

  const getArticles = async () => {
    try {
      const response = await ApiCalls.getArticles();
      setArticles(response.data.results);
    } catch (err) {
      toast({
        title: parseError(err),
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <Container maxW={"3xl"} id="articles">
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        pb={{ base: 20, md: 36 }}
      >
        <Stack align="center" direction="row" p={4}>
          <HStack mx={4}>
            <Text color={"teal.400"} fontWeight={800}></Text>
            <Text fontWeight={800}>Articles</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Stack>
        <Stack px={4} spacing={4}>
          {articles.length ? (
            articles.map((article: IArticle) => (
              <Fade>
                <Card
                  key={article.title}
                  direction={{
                    base: "column",
                  }}
                  overflow="hidden"
                >
                  <Image objectFit="cover" src={article.image} />
                  <Stack>
                    <CardBody>
                      <Heading size="md">{article.title}</Heading>
                      <Text py={2}>
                        {truncate(article.content, 200, "...")}
                      </Text>
                      <HStack py={2}>
                        <Link to={`/articles/${article.id}`}>
                          <Button color={"teal.400"}>Read more</Button>
                        </Link>
                      </HStack>
                      <HStack pt={4} spacing={2}>
                        {article.tags.map((tag: ITag) => (
                          <Badge key={tag.tag} colorScheme={"teal"}>
                            {tag.tag}
                          </Badge>
                        ))}
                      </HStack>
                    </CardBody>
                  </Stack>
                </Card>
              </Fade>
            ))
          ) : (
            <Stack justifyContent="center" alignItems="center">
              <Heading size="lg">No articles yet</Heading>
              <Text>
                <Box as="span" color={"teal.500"}>
                  <Link to="/terminal">Try</Link>{" "}
                </Box>
                the terminal instead.
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Blog;
