import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { IArticle, ITag } from "../../domain/common/interfaces";
import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { Link, useParams } from "react-router-dom";
import { CalendarIcon } from "@chakra-ui/icons";
import Markdown from "../../components/common/Markdown";
import { FaArrowLeft } from "react-icons/fa";

const BlogDetails = (): ReactElement => {
  const toast = useToast();
  const params = useParams();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const metaBg = useColorModeValue("gray.50", "gray.700");

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
    // eslint-disable-next-line
  }, []);

  function getLocale() {
    return navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  }

  const locale = getLocale();
  const format = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Flex direction="column">
      <Container maxW="4xl" id="blog-details">
        {/* Back link */}
        <Box pt={4} pb={2} className="animate-fade-in-up">
          <Link to="/blog">
            <HStack
              spacing={2}
              color="teal.400"
              fontWeight="600"
              fontSize="sm"
              _hover={{ color: "teal.300" }}
              transition="all 0.2s"
            >
              <Icon as={FaArrowLeft} boxSize={3} />
              <Text>Back to Blog</Text>
            </HStack>
          </Link>
        </Box>

        {/* Article Header */}
        <Stack
          spacing={{ base: 4, md: 6 }}
          pt={4}
          pb={6}
          className="animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <Heading
            fontWeight={800}
            fontSize={{ base: "2xl", md: "4xl" }}
            letterSpacing="-0.02em"
            lineHeight="1.2"
          >
            {article?.title}
          </Heading>
          <Text color={subtitleColor} fontSize={{ base: "md", md: "lg" }}>
            {article?.description}
          </Text>
        </Stack>

        {/* Hero Image */}
        {article?.image && (
          <Box
            borderRadius="2xl"
            overflow="hidden"
            mb={6}
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Image
              maxHeight="45vh"
              width="100%"
              objectFit="cover"
              src={article.image}
              alt={article.slug}
              transition="transform 0.5s ease"
              _hover={{ transform: "scale(1.02)" }}
            />
          </Box>
        )}

        {/* Author & Date Meta */}
        <Box
          bg={metaBg}
          borderRadius="xl"
          p={4}
          mb={8}
          border="1px solid"
          borderColor={borderColor}
          className="animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "start", md: "center" }}
            gap={4}
          >
            <HStack spacing={3}>
              <Avatar
                size="md"
                name="Ajdin Halac"
                src="https://media.licdn.com/dms/image/v2/D4D03AQEAdT2dha2OJQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721716686255?e=2147483647&v=beta&t=yqvil96C3YIDJyVQOU7QvnwqWOL6BFiC66Hvoy70-zM"
                ring="2px"
                ringColor="teal.400"
              />
              <Box>
                <Text fontWeight="700" fontSize="sm">
                  Ajdin Halac
                </Text>
                <Link to="https://github.com/AjdinHalac">
                  <Text color="teal.400" fontSize="xs" fontWeight="500">
                    @AjdinHalac
                  </Text>
                </Link>
              </Box>
            </HStack>
            <HStack spacing={2} color={subtitleColor}>
              <CalendarIcon boxSize={4} />
              <Text fontSize="sm" fontWeight="500">
                {article?.publishedAt
                  ? format.format(new Date(article.publishedAt))
                  : null}
              </Text>
            </HStack>
          </Flex>
        </Box>

        {/* Article Content */}
        <Box
          bg={cardBg}
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          p={{ base: 4, md: 8 }}
          mb={8}
          className="animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
          sx={{
            "& p": { lineHeight: "1.8", mb: 4 },
            "& h1, & h2, & h3": { mt: 8, mb: 4 },
            "& img": { borderRadius: "xl", my: 6 },
            "& pre": { borderRadius: "xl", my: 4 },
            "& blockquote": {
              borderLeft: "4px solid",
              borderColor: "teal.400",
              pl: 4,
              py: 2,
              my: 4,
              fontStyle: "italic",
            },
          }}
        >
          <Markdown markdown={article?.content} />
        </Box>

        {/* Tags */}
        <Box
          pb={10}
          className="animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Divider mb={6} borderColor={borderColor} />
          <HStack spacing={2} mb={4}>
            <Heading size="sm" color={subtitleColor}>
              Tags
            </Heading>
          </HStack>
          <Wrap spacing={2}>
            {article?.tags
              ? article.tags.map((tag: ITag) => (
                  <WrapItem key={tag.tag}>
                    <Badge
                      colorScheme="teal"
                      variant="subtle"
                      borderRadius="full"
                      px={4}
                      py={1.5}
                      fontSize="sm"
                      fontWeight="600"
                    >
                      {tag.tag}
                    </Badge>
                  </WrapItem>
                ))
              : null}
          </Wrap>
        </Box>
      </Container>
    </Flex>
  );
};

export default BlogDetails;
