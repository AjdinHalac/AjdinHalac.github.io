import React, { useState, useEffect } from "react";

import { createQueryString, parseError } from "../../utils/helpers";
import { IPaginator, ITag } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Tags = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [paginator, setPaginator] = useState<Partial<IPaginator>>({
    perPage: 10,
  });

  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<ITag[]>([]);

  const setFilterValueAndResetPage = (value: string) => {
    setFilterValue(value);
    setPage(1);
  };

  const getTags = async () => {
    try {
      const response = await ApiCalls.getTags(
        createQueryString({ ...paginator, page, filter: filterValue })
      );
      setTags(response.data.results || []);
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

  const removeTag = async (id: number) => {
    try {
      await ApiCalls.removeTag(id);
      await getTags();
      toast({
        title: "Tag created",
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
  }, [page, filterValue]);

  return <>Tags</>;
};

export default Tags;
