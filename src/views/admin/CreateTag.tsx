import React, { useState } from "react";

import ApiCalls from "../../domain/admin/api/ApiCalls";
import { ITag } from "../../domain/common/interfaces";
import { parseError } from "../../utils/helpers";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateTag = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [tag, setTag] = useState<Partial<ITag>>({
    tag: "",
  });

  const createTag = async () => {
    try {
      const response = await ApiCalls.createTag({
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
      navigate(`/admin/tags/${response.data.id}`);
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

  return <>Create tag</>;
};

export default CreateTag;
