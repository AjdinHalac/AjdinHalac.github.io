import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { createQueryString, parseError } from "../../utils/helpers";
import { IPaginator, IUser } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { useToast } from "@chakra-ui/react";

const Users = () => {
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
  const [alert, setAlert] = useState(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const pageChange = (newPage: any) => {
    setPage(newPage);
  };

  const setFilterValueAndResetPage = (value: string) => {
    setFilter(value);
    setPage(1);
  };

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

  return <>Users</>;
};

export default Users;
