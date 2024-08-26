import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { IArticle, ITag } from "../../domain/common/interfaces";
import { Avatar, Badge, Box, Button, Flex, FormControl, FormLabel, Grid, Heading, HStack, Icon, Image, Input, SimpleGrid, Stack, Text, Textarea, useBreakpointValue, useToast, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import Markdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { CalendarIcon } from "@chakra-ui/icons";

const Article = () => {
  const toast = useToast();
  const params = useParams()
  const [article, setArticle] = useState<Partial<IArticle>>({
    title: "",
    description: "",
    image: "",
    content: "",
    tags: []
  });
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  const getTags = async () => {
    try {
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

  const getArticle = async (slug: string) => {
    try {
      const response = await ApiCalls.getArticleById(slug);
      setArticle(response.data);
      setSelectedTagIds(response?.data.tags?.map(item => item.id))

      const responseTags = await ApiCalls.getTags("perPage=1000");
      setTags(responseTags.data.results);
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

  const updateArticle = async () => {
    try {
      if (!params.slug) {
        return
      }
      await ApiCalls.updateArticle(params.slug, {
        payload: {
          title: article?.title,
          description: article?.description,
          image: article?.image,
          content: article?.content,
          tags: selectedTagIds
        },
      });
      toast({
        title: "Article updated",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
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

  const publishArticle = async () => {
    try {
      if (!params.slug) {
        return
      }
      await ApiCalls.publishArticle(params.slug);
      toast({
        title: "Article published",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
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

  const toggleTagSelection = (tag: ITag) => {
    setSelectedTagIds((prevSelectedTagIds) => {
      if (prevSelectedTagIds.includes(tag.id)) {
        // Remove the tag ID if it's already selected
        if (article.tags) {
          setArticle({ ...article, tags: article.tags.filter(tagElement => tagElement.id !== tag.id) })
        }
        return prevSelectedTagIds.filter(tagId => tagId !== tag.id);
      } else {
        // Add the tag ID if it's not selected
        if (article.tags) {
          setArticle({ ...article, tags: [...article.tags, tag] })
        }
        return [...prevSelectedTagIds, tag.id];
      }
    });
  };

  useEffect(() => {
    if (!params.slug) {
      return window.location.replace("/#/admin/articles");
    }
    getArticle(params.slug);
    getTags();
    // eslint-disable-next-line
  }, []);

  const [size, setSize] = useState('lg'); // Default size

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
  };

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
    <Grid templateColumns={size === 'sm' ? '1fr 0.5fr' : size === 'md' ? '1fr 1fr' : '1fr 2fr'} gap={8}>
      {/* Markdown Editor */}
      <Box>
        <HStack mb={4}>
          <Heading size="md">Editor</Heading>
          <Button
            onClick={() => updateArticle()}
          >
            Save
          </Button>
        </HStack>
        <Box px={2} borderRadius={"md"} border={"1px"} height="87vh" overflowY={"scroll"}>
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>Slug</FormLabel>
              <Input
                type="text"
                disabled
                value={article?.slug}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={article?.title}
                onChange={(e: any) => setArticle({ ...article, title: e.currentTarget.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={article?.description}
                onChange={(e: any) => setArticle({ ...article, description: e.currentTarget.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                value={article?.image}
                onChange={(e: any) => setArticle({ ...article, image: e.currentTarget.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                type="text"
                value={"by Ajdin Halac"}
                disabled
              />
            </FormControl>

            <FormControl>
              <FormLabel>Published</FormLabel>
              <Input
                type="text"
                value={article?.publishedAt}
                disabled
              />
            </FormControl>

            <FormControl>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={article?.content}
                onChange={(e) => setArticle({ ...article, content: e.currentTarget.value })}
                height="50vh"
                placeholder="Write your markdown here..."
              />
            </FormControl>

            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Wrap py={2} spacing={2}>
                {tags.map((tag: ITag) => (
                  <WrapItem>
                    <Badge
                      key={tag.tag}
                      colorScheme={selectedTagIds?.includes(tag.id) ? "teal" : "gray"}
                      cursor="pointer"
                      mr={2}
                      mb={2}
                      onClick={() => toggleTagSelection(tag)}
                    >
                      {tag.tag}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </FormControl>
          </VStack>
        </Box>
      </Box>

      <Box>
        <HStack mb={4}>
          <Heading size="md">Preview</Heading>
          <Button
            onClick={() => publishArticle()}
          >
            Publish
          </Button>
          <Button onClick={() => handleSizeChange('lg')} colorScheme={size === 'lg' ? 'teal' : 'gray'}>
            Large
          </Button>
          <Button onClick={() => handleSizeChange('md')} colorScheme={size === 'md' ? 'teal' : 'gray'}>
            Medium
          </Button>
          <Button onClick={() => handleSizeChange('sm')} colorScheme={size === 'sm' ? 'teal' : 'gray'}>
            Small
          </Button>
        </HStack>
        <Box px={2} borderRadius={"md"} border={"1px"} height="87vh" overflowY={"scroll"}>
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
        </Box>
      </Box>
    </Grid >
  );
};

export default Article;
