import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createQueryString, parseError } from "../../utils/helpers";
import { IArticle, IPaginator } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Textarea, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";

const Articles = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const params = new URLSearchParams(useLocation().search);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [article, setArticle] = useState<Partial<IArticle>>({
    title: "",
    description: "",
    content: "#Content",
    image: "Image",
  });
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

  const showDeleteArticleAlert = (slug: string) => {
    if (window.confirm('Are you sure?')) {
      removeArticle(slug)
    }
  }

  const createArticle = async () => {
    try {
      const response = await ApiCalls.createArticle({
        payload: {
          title: article?.title,
          description: article?.description,
          content: article?.content,
          image: article?.image,
        },
      });
      toast({
        title: "Article created",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
      navigate(`/admin/articles/${response.data.slug}`);
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
      navigate(`/admin/articles?${query}`);
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

  const removeArticle = async (slug: string) => {
    try {
      await ApiCalls.removeArticle(slug);
      await getArticles();
      toast({
        title: "Article removed",
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

  const publishArticle = async (slug: string) => {
    try {
      await ApiCalls.publishArticle(slug);
      await getArticles();
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

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line
  }, [perPage, page, orderBy, orderDir, filter]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' onClick={() => createArticle()} mr={3}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading mb="4">Articles</Heading>
      <HStack>
        <FormControl>
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
        <FormControl>
          <FormLabel htmlFor="search">Per Page</FormLabel>
          <Select id="perPage" value={perPage} onChange={(e) => setPerPage(Number(e.currentTarget.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="search">Order By</FormLabel>
          <Select id="orderBy" value={orderBy} onChange={(e) => setOrderBy(e.currentTarget.value)}>
            <option value={"id"}>id</option>
            <option value={"published_at"}>Published At</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="search">Order Dir</FormLabel>
          <Select id="orderDir" value={orderDir} onChange={(e) => setOrderDir(e.currentTarget.value)}>
            <option value={"ASC"}>ASC</option>
            <option value={"DESC"}>DESC</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="search">Create Article</FormLabel>
          <Button
            color="secondary"
            onClick={onOpen}
          >
            Open Modal
          </Button>
        </FormControl>
      </HStack>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Published</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {articles.map((item, index) => (
            <Tr onClick={() => navigate(`/admin/articles/${item.slug}`)} key={index}>
              <Td>{item.id}</Td>
              <Td>{item.title}</Td>
              <Td>{item.publishedAt}</Td>
              <Td>
                {item.publishedAt ? null : (
                  <Button
                    color="success"
                    onClick={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      publishArticle(item?.slug);
                    }}
                  >
                    Publish
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showDeleteArticleAlert(item?.slug);
                  }}
                >
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button
        style={{ float: 'right', margin: 5 }}
        isDisabled={!!(paginator && paginator.totalPages && page === paginator.totalPages)}
        color="secondary"
        onClick={() => pageChange(page + 1)}
      >
        Next
      </Button>
      <Button
        style={{ float: 'right', margin: 5 }}
        isDisabled={page === 1}
        color="secondary"
        onClick={() => { pageChange(page - 1); console.log(page) }}
      >
        Previous
      </Button>
    </Box>
  );
};

export default Articles;
