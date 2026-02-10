import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { IArticle, IPaginator, ITag } from "../../domain/common/interfaces";
import { createQueryString, parseError, truncate } from "../../utils/helpers";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { Link } from "react-router-dom";
import {
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { FaBookOpen, FaTerminal } from "react-icons/fa";

const Blog = (): ReactElement => {
  const navigate = useNavigate();
  const toast = useToast();
  const params = new URLSearchParams(useLocation().search);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.100");
  const searchBg = useColorModeValue("white", "gray.800");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const [perPage] = useState<number>(
    params.get("perPage") ? Number(params.get("perPage")) : 10,
  );
  const [page, setPage] = useState<number>(
    params.get("page") ? Number(params.get("page")) : 1,
  );
  const [orderBy] = useState<string>(
    params.get("orderBy") ? String(params.get("orderBy")) : "id",
  );
  const [orderDir] = useState<string>(
    params.get("orderDir") ? String(params.get("orderDir")) : "ASC",
  );
  const [filter, setFilter] = useState<string>(
    params.get("filter") ? String(params.get("filter")) : "",
  );
  const [paginator, setPaginator] = useState<Partial<IPaginator>>({
    perPage: perPage,
    page: page,
    orderBy: orderBy,
    orderDir: orderDir,
    filter: filter,
  });
  const [articles, setArticles] = useState<IArticle[]>([]);

  const setFilterValueAndResetPage = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  const pageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getArticles = async () => {
    try {
      const query = createQueryString({
        perPage,
        page,
        orderBy,
        orderDir,
        filter,
      });
      const response = await ApiCalls.getArticles(query);
      setArticles(response.data.results || []);
      setPaginator(response.data.paginator);
      navigate(`/blog?${query}`);
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
    // eslint-disable-next-line
  }, [perPage, page, orderBy, orderDir, filter]);

  return (
    <Flex direction="column">
      <Container maxW="5xl" id="blog">
        {/* Page Header */}
        <Stack
          spacing={4}
          textAlign="center"
          pt={{ base: 4, md: 8 }}
          pb={{ base: 6, md: 10 }}
          className="animate-fade-in-up"
        >
          <HStack justify="center" spacing={3}>
            <Icon as={FaBookOpen} boxSize={6} color="teal.400" />
            <Heading size={{ base: "lg", md: "xl" }} className="gradient-text">
              Blog
            </Heading>
          </HStack>
          <Text color={subtitleColor} fontSize="lg" maxW="2xl" mx="auto">
            Thoughts, tutorials, and insights on software engineering
          </Text>
        </Stack>

        {/* Search */}
        <Box
          maxW="lg"
          mx="auto"
          mb={10}
          className="animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="teal.400" />
            </InputLeftElement>
            <Input
              id="search"
              placeholder="Search articles..."
              value={filter}
              onChange={(e) =>
                setFilterValueAndResetPage(e.currentTarget.value)
              }
              bg={searchBg}
              border="2px solid"
              borderColor={cardBorder}
              borderRadius="xl"
              _focus={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              _placeholder={{ color: "gray.500" }}
            />
          </InputGroup>
        </Box>

        {/* Articles Grid */}
        <SimpleGrid spacing={6} columns={{ base: 1, lg: 2 }} pb={10}>
          {articles.length ? (
            articles.map((article: IArticle, index: number) => (
              <Card
                key={article.title}
                overflow="hidden"
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorder}
                borderRadius="2xl"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-6px)",
                  boxShadow: "0 20px 60px -15px rgba(49, 151, 149, 0.2)",
                  borderColor: "teal.400",
                }}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader p={0}>
                  <Box overflow="hidden">
                    <Image
                      objectFit="cover"
                      src={article.image}
                      alt={article.slug}
                      w="100%"
                      h="200px"
                      transition="transform 0.5s ease"
                      _hover={{ transform: "scale(1.05)" }}
                    />
                  </Box>
                  <HStack px={5} pt={4} spacing={2} flexWrap="wrap">
                    {article.tags
                      ? article.tags.map((tag: ITag) => (
                          <Badge
                            key={tag.tag}
                            colorScheme="teal"
                            variant="subtle"
                            borderRadius="full"
                            px={3}
                            py={1}
                            fontSize="xs"
                          >
                            {tag.tag}
                          </Badge>
                        ))
                      : null}
                  </HStack>
                </CardHeader>
                <CardBody px={5} py={3}>
                  <Heading size="md" mb={2} noOfLines={2}>
                    {article.title}
                  </Heading>
                  <Text color={subtitleColor} fontSize="sm" noOfLines={3}>
                    {truncate(article.description, 200, "...")}
                  </Text>
                </CardBody>
                <CardFooter px={5} pb={5} pt={0}>
                  <Link to={`/blog/${article.slug}`} style={{ width: "100%" }}>
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="teal"
                      variant="ghost"
                      size="sm"
                      w="100%"
                      borderRadius="xl"
                      _hover={{
                        bg: "teal.50",
                        transform: "translateX(4px)",
                      }}
                    >
                      Read article
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Box gridColumn={{ lg: "span 2" }}>
              <Stack
                justifyContent="center"
                alignItems="center"
                spacing={4}
                py={16}
                className="animate-fade-in-up"
              >
                <Icon
                  as={FaTerminal}
                  boxSize={12}
                  color="teal.400"
                  opacity={0.6}
                />
                <Heading size="lg" className="gradient-text">
                  No articles yet
                </Heading>
                <Text color={subtitleColor} fontSize="lg">
                  <Box as="span" color="teal.400" fontWeight="600">
                    <Link to="/terminal">Try the terminal</Link>
                  </Box>{" "}
                  while you wait.
                </Text>
              </Stack>
            </Box>
          )}
        </SimpleGrid>

        {/* Pagination */}
        <Center pb={10}>
          <HStack spacing={3}>
            <Button
              isDisabled={page === 1}
              leftIcon={<ChevronLeftIcon />}
              colorScheme="teal"
              variant="outline"
              size="md"
              borderRadius="xl"
              onClick={() => pageChange(page - 1)}
            >
              Previous
            </Button>
            <Box
              px={4}
              py={2}
              borderRadius="xl"
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              fontWeight="600"
              fontSize="sm"
            >
              Page {page}
              {paginator.totalPages ? ` of ${paginator.totalPages}` : ""}
            </Box>
            <Button
              isDisabled={
                !!(
                  paginator &&
                  paginator.totalPages &&
                  page === paginator.totalPages
                )
              }
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
              variant="outline"
              size="md"
              borderRadius="xl"
              onClick={() => pageChange(page + 1)}
            >
              Next
            </Button>
          </HStack>
        </Center>
      </Container>
    </Flex>
  );
};

export default Blog;
