import React, { useEffect, useState } from "react";
import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { IArticle, ITag } from "../../domain/common/interfaces";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Tag = ({ match }: any) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [tag, setTag] = useState<Partial<ITag>>({ tag: "" });

  const getTag = async () => {
    try {
      const response = await ApiCalls.getTagById(match.params.id);
      setTag(response.data);
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

  const updateTag = async () => {
    try {
      const response = await ApiCalls.updateTag(match.params.id, {
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
      navigate(`/admin/tags/${response.data.slug}`);
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
    getTag();
    // eslint-disable-next-line
  }, []);

  return <>Tag</>;
};

export default Tag;
