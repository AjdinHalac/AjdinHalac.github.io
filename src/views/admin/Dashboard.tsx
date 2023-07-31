import React, { useState, useEffect } from "react";

import { createQueryString, parseError } from "../../utils/helpers";
import { IUserMetrics } from "../../domain/admin/interfaces";
import { IPaginator } from "../../domain/common/interfaces";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { useToast } from "@chakra-ui/react";

const Dashboard = () => {
  const toast = useToast();
  const date = new Date();
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  const [userMetrics, setUserMetrics] = useState<IUserMetrics[]>([]);
  const [paginator] = useState<Partial<IPaginator>>({
    perPage: 5000,
    groupBy: "day",
    fromDate: fromDate.toISOString(),
    toDate: date.toISOString(),
  });
  const getMetrics = async () => {
    try {
      const userResponse = await ApiCalls.getUserMetrics(
        createQueryString({ ...paginator })
      );
      setUserMetrics(userResponse.data.results || []);
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
    getMetrics();
    // eslint-disable-next-line
  }, []);

  return <>Dashboard</>;
};

export default Dashboard;
