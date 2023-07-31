import React, { useEffect, useState } from "react";
import axios from "axios";

import SystemApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { IArticle } from "../../domain/common/interfaces";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useNavigation } from "react-router-dom";

const CreateArticle = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [article, setArticle] = useState<Partial<IArticle>>({
    content: "",
    image: "",
    title: "",
  });

  const onImageChange = async (e: any) => {
    setIsUploading(true);

    const file = e.target.files[0];

    try {
      const signedUrlResponse = await SystemApiCalls.getSignedUrlForUpload({
        payload: {
          contentType: file.type,
          fileName: file.name,
          kind: "articles",
        },
      });

      const options = {
        headers: {
          "Content-Type": signedUrlResponse.data.contentType,
          "Access-Control-Allow-Origin": "*",
          "x-amz-acl": "public-read",
        },
      };

      await axios.put(signedUrlResponse.data.url, file, options);
      setIsUploading(false);
      setImageUrl(signedUrlResponse.data.accessURL);
    } catch (err) {
      setIsUploading(false);
      setImageUrl("");
      toast({
        title: parseError(err),
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    }
  };

  const createArticle = async () => {
    try {
      const response = await ApiCalls.createArticle({
        payload: {
          title: article?.title,
          image: imageUrl,
          content: article?.content,
        },
      });
      toast({
        title: "Article created",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
      navigate(`/admin/articles/${response.data.slug}`);
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
    // eslint-disable-next-line
  }, []);

  return <>Create article</>;
};

export default CreateArticle;
