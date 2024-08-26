import { useState, useEffect } from "react";

import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { Box, Heading, HStack, Stat, StatHelpText, StatLabel, StatNumber, useToast } from "@chakra-ui/react";

const Dashboard = () => {
  const toast = useToast();
  const [articles, setArticles] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);

  const getArticles = async () => {
    try {
      const response = await ApiCalls.getArticles('');
      setArticles(response.data.paginator.totalEntriesSize || 0);
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

  const getUsers = async () => {
    try {
      const response = await ApiCalls.getUsers('');
      setUsers(response.data.paginator.totalEntriesSize || 0);
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
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>

      <Heading mb="4">Dashboard</Heading>
      <HStack>
        <Stat>
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{users}</StatNumber>
          <StatHelpText>Today</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Articles</StatLabel>
          <StatNumber>{articles}</StatNumber>
          <StatHelpText>Today</StatHelpText>
        </Stat>
      </HStack>
    </Box>
  );
};

export default Dashboard;
