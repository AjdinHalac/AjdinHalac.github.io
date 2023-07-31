import React, { useEffect, useState } from "react";

import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { ITos } from "../../domain/common/interfaces";
import { useToast } from "@chakra-ui/react";

const Tos = ({ match }: any) => {
  const toast = useToast();
  const [tos, setTos] = useState<Partial<ITos>>({ tosURI: "" });

  const getTos = async () => {
    try {
      const response = await ApiCalls.getTos(match.params.id);
      setTos(response.data);
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
    getTos();
    // eslint-disable-next-line
  }, []);

  return <>Tos</>;
};

export default Tos;
