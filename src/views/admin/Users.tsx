import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createQueryString, parseError } from "../../utils/helpers";
import { IUser, IPaginator } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Select, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";

const Users = () => {
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
    params.get("orderBy") ? String(params.get("orderBy")) : "created_at"
  );
  const [orderDir, setOrderDir] = useState<string>(
    params.get("orderDir") ? String(params.get("orderDir")) : "DESC"
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
  const [users, setUsers] = useState<IUser[]>([]);

  const pageChange = (newPage: any) => {
    setPage(newPage);
  };

  const setFilterValueAndResetPage = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  const showDeleteUserAlert = (uuid: string) => {
    if (window.confirm('Are you sure?')) {
      removeUser(uuid)
    }
  }

  const getUsers = async () => {
    try {
      const query = createQueryString({
        perPage: perPage,
        page: page,
        orderBy: orderBy,
        orderDir: orderDir,
        filter: filter,
      });
      const response = await ApiCalls.getUsers(query);
      setUsers(response.data.results || []);
      setPaginator(response.data.paginator);
      navigate(`/admin/users?${query}`);
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

  const removeUser = async (uuid: string) => {
    try {
      await ApiCalls.removeUser(uuid);
      await getUsers();
      toast({
        title: "User removed",
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
    getUsers();
    // eslint-disable-next-line
  }, [perPage, page, orderBy, orderDir, filter]);

  return (
    <Box>
      <Heading mb="4">Users</Heading>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="search">Search</FormLabel>
          <Input
            id="search"
            placeholder="Search by email"
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
      </HStack>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Verified</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Flag Submitted</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, index) => (
            <Tr onClick={() => navigate(`/admin/users/${item.uuid}`)} key={index}>
              <Td>{item.email}</Td>
              <Td>{item.emailVerified ? 'Yes' : 'No'}</Td>
              <Td>{item.firstName}</Td>
              <Td>{item.lastName}</Td>
              <Td>{item.flagSubmitted ? 'Yes' : 'No'}</Td>
              <Td>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showDeleteUserAlert(item?.uuid);
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

export default Users;
