import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createQueryString, parseError } from "../../utils/helpers";
import { ITos, IPaginator } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";

const Tos = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const params = new URLSearchParams(useLocation().search);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tos, setTos] = useState<Partial<ITos>>({
    tosURI: "",
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
  const [paginator, setPaginator] = useState<Partial<IPaginator>>({
    perPage: perPage,
    page: page,
    orderBy: orderBy,
    orderDir: orderDir,
  });
  const [tosList, setTosList] = useState<ITos[]>([]);

  const pageChange = (newPage: any) => {
    setPage(newPage);
  };

  const createTos = async () => {
    try {
      await ApiCalls.createTos({
        payload: {
          tosURI: tos?.tosURI,
        },
      });
      toast({
        title: "Tos created",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
      onClose()
      getTosList();
      setTos({ ...tos, id: 0, tosURI: "" })
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

  const getTosList = async () => {
    try {
      const query = createQueryString({
        perPage: perPage,
        page: page,
        orderBy: orderBy,
        orderDir: orderDir,
      });
      const response = await ApiCalls.getTosList(query);
      setTosList(response.data.results || []);
      setPaginator(response.data.paginator);
      navigate(`/admin/tos?${query}`);
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
    getTosList();
    // eslint-disable-next-line
  }, [perPage, page, orderBy, orderDir]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tos.id ? "Preview" : "Create"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Link</FormLabel>
              <Input
                type="text"
                value={tos?.tosURI}
                disabled={tos.id ? true : false}
                onChange={(e: any) => setTos({ ...tos, tosURI: e.currentTarget.value })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' hidden={tos.id ? true : false} onClick={() => tos.id ? createTos() : onOpen()} mr={3}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading mb="4">ToS</Heading>
      <HStack>
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
          <FormLabel htmlFor="search">Create ToS</FormLabel>
          <Button
            color="secondary"
            onClick={() => { setTos({ ...tos, id: 0, tosURI: "" }); onOpen() }}
          >
            Open Modal
          </Button>
        </FormControl>
      </HStack>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>URI</Th>
            <Th>Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tosList.map((item, index) => (
            <Tr onClick={() => { setTos({ ...tos, id: item.id, tosURI: item.tosURI }); onOpen() }} key={index}>
              <Td>{item.id}</Td>
              <Td>{item.tosURI}</Td>
              <Td>{item.createdAt}</Td>
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

export default Tos;
