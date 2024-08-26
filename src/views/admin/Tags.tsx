import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createQueryString, parseError } from "../../utils/helpers";
import { ITag, IPaginator } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";

const Tags = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const params = new URLSearchParams(useLocation().search);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tag, setTag] = useState<Partial<ITag>>({
    id: 0,
    tag: "",
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
  const [tags, setTags] = useState<ITag[]>([]);

  const setFilterValueAndResetPage = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  const pageChange = (newPage: any) => {
    setPage(newPage);
  };

  const showDeleteTagAlert = (id: number) => {
    if (window.confirm('Are you sure?')) {
      removeTag(id)
    }
  }

  const createTag = async () => {
    try {
      await ApiCalls.createTag({
        payload: {
          tag: tag?.tag,
        },
      });
      toast({
        title: "Tag created",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
      onClose()
      getTags();
      setTag({ ...tag, id: 0, tag: "" })
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

  const updateTag = async (id: number) => {
    try {
      await ApiCalls.updateTag(id, {
        payload: {
          tag: tag?.tag,
        },
      });
      toast({
        title: "Tag updated",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
      onClose()
      getTags();
      setTag({ ...tag, id: 0, tag: "" })
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

  const getTags = async () => {
    try {
      const query = createQueryString({
        perPage: perPage,
        page: page,
        orderBy: orderBy,
        orderDir: orderDir,
        filter: filter,
      });
      const response = await ApiCalls.getTags(query);
      setTags(response.data.results || []);
      setPaginator(response.data.paginator);
      navigate(`/admin/tags?${query}`);
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

  const removeTag = async (id: number) => {
    try {
      await ApiCalls.removeTag(id);
      await getTags();
      toast({
        title: "Tag removed",
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
    getTags();
    // eslint-disable-next-line
  }, [perPage, page, orderBy, orderDir, filter]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tag.id ? "Edit" : "Create"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Tag</FormLabel>
              <Input
                type="text"
                value={tag?.tag}
                onChange={(e: any) => setTag({ ...tag, tag: e.currentTarget.value })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' onClick={() => tag.id ? updateTag(tag.id) : createTag()} mr={3}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading mb="4">Tags</Heading>
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
            <option value={"created_at"}>Created At</option>
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
          <FormLabel htmlFor="search">Create Tag</FormLabel>
          <Button
            color="secondary"
            onClick={() => { setTag({ ...tag, id: 0, tag: "" }); onOpen() }}
          >
            Open Modal
          </Button>
        </FormControl>
      </HStack>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Tag</Th>
            <Th>Created</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tags.map((item, index) => (
            <Tr onClick={() => { setTag({ ...tag, id: item.id, tag: item.tag }); onOpen() }} key={index}>
              <Td>{item.id}</Td>
              <Td>{item.tag}</Td>
              <Td>{item.createdAt}</Td>
              <Td>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showDeleteTagAlert(item?.id);
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

export default Tags;
