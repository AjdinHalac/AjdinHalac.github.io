import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Flex, FormControl, FormLabel, HStack, Heading, Image, Input, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { IArticle, IPaginator, ITag } from "../../domain/common/interfaces";
import { createQueryString, parseError, truncate } from "../../utils/helpers";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";


const Blog = (): ReactElement => {
    const navigate = useNavigate();
    const toast = useToast();
    const params = new URLSearchParams(useLocation().search);

    const [perPage, setPerPage] = useState<number>(
        params.get("perPage") ? Number(params.get("perPage")) : 10
    );
    const [page, setPage] = useState<number>(
        params.get("page") ? Number(params.get("page")) : 1
    );
    const [orderBy, setOrderBy] = useState<string>(
        params.get("orderBy") ? String(params.get("orderBy")) : "id"
    );
    const [orderDir, setOrderDir] = useState<string>(
        params.get("orderDir") ? String(params.get("orderDir")) : "ASC"
    );
    const [filter, setFilter] = useState<string>(
        params.get("filter") ? String(params.get("filter")) : ""
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

    const pageChange = (newPage: any) => {
        setPage(newPage);
    };

    const getArticles = async () => {
        try {
            const query = createQueryString({
                perPage: perPage,
                page: page,
                orderBy: orderBy,
                orderDir: orderDir,
                filter: filter,
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
        <Flex direction={"column"}>
            <Container maxW={"4xl"} id="blog">
                <Stack
                    as={Box}
                    spacing={{ base: 8, md: 14 }}
                    pb={{ base: 6, md: 10 }}
                >
                    <HStack>
                        <FormControl p={4}>
                            <FormLabel htmlFor="search">Search</FormLabel>
                            <Input
                                id="search"
                                placeholder="Search by title"
                                value={filter}
                                onChange={(e) => setFilterValueAndResetPage(e.currentTarget.value)}
                                max={100}
                                min={1}
                            />
                        </FormControl>
                    </HStack>
                    <SimpleGrid px={4} spacing={4} columns={{ base: 1, lg: 2 }}>
                        {articles.length ? (
                            articles.map((article: IArticle) => (
                                <Card
                                    key={article.title}
                                    overflow="hidden"
                                >
                                    <CardHeader>
                                        <Image objectFit="cover" src={article.image} />
                                        <HStack pt={4} spacing={2}>
                                            {article.tags ? article.tags.map((tag: ITag) => (
                                                <Badge key={tag.tag} colorScheme={"teal"}>
                                                    {tag.tag}
                                                </Badge>
                                            )) : null}
                                        </HStack>
                                    </CardHeader>
                                    <CardBody>
                                        <Heading size="md">{article.title}</Heading>
                                        <Text py={2}>
                                            {truncate(article.description, 200, "...")}
                                        </Text>
                                    </CardBody>
                                    <CardFooter>
                                        <Center width={"100%"}>
                                            <Link to={`/blog/${article.slug}`}>
                                                <Button rightIcon={<ArrowForwardIcon />} color={"teal.400"}>Read more</Button>
                                            </Link>
                                        </Center>
                                    </CardFooter>
                                </Card>
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
                    </SimpleGrid>
                </Stack>

                <Center>
                    <HStack>
                        <Button
                            isDisabled={page === 1}
                            color="secondary"
                            onClick={() => { pageChange(page - 1); console.log(page) }}
                        >
                            Past
                        </Button>
                        <Button
                            isDisabled={!!(paginator && paginator.totalPages && page === paginator.totalPages)}
                            color="secondary"
                            onClick={() => pageChange(page + 1)}
                        >
                            Next
                        </Button>
                    </HStack>
                </Center>
            </Container>
        </Flex >
    );
};

export default Blog;
