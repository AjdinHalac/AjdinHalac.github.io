import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { createQueryString, parseError, truncate } from "../../utils/helpers";
import { IArticle, IPaginator } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { useToast } from "@chakra-ui/react";

const Articles = () => {
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

  const removeArticle = async (slug: string) => {
    try {
      await ApiCalls.removeArticle(slug);
      await getArticles();
      toast({
        title: "Article deleted",
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

  const getBadge = (price: number | null | string | boolean) => {
    if (price) {
      return "success";
    }
    return "danger";
  };

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line
  }, [perPage, page, orderBy, orderDir, filter]);

  return <>Articles</>;
};

export default Articles;
