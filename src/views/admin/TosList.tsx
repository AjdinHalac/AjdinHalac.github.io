import React, { useState, useEffect } from "react";

import { createQueryString, parseError } from "../../utils/helpers";
import { IPaginator, ITos } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { useToast } from "@chakra-ui/react";

const TosList = () => {
  const toast = useToast();
  const [paginator, setPaginator] = useState<Partial<IPaginator>>({
    perPage: 10,
  });
  const [page, setPage] = useState<number>(1);
  const [tosList, setTosList] = useState<ITos[]>([]);

  const getTosList = async () => {
    try {
      const response = await ApiCalls.getTosList(
        createQueryString({ ...paginator, page })
      );
      setTosList(response.data.results || []);
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

  const pageChange = (newPage: any) => {
    setPage(newPage);
  };

  useEffect(() => {
    getTosList();
    // eslint-disable-next-line
  }, [page]);

  return <>TosList</>;
};

export default TosList;
