import React, { useState } from "react";
import axios from "axios";

import SystemApiCalls from "../../domain/landing/api/ApiCalls";
import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateTos = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [tosURI, setTosUrl] = useState<string>("");

  const onTosChange = async (e: any) => {
    setIsUploading(true);

    const file = e.target.files[0];

    try {
      const signedUrlResponse = await SystemApiCalls.getSignedUrlForUpload({
        payload: {
          contentType: file.type,
          fileName: file.name,
          kind: "tos",
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
      setTosUrl(signedUrlResponse.data.accessURL);
    } catch (err) {
      setIsUploading(false);
      setTosUrl("");
      toast({
        title: parseError(err),
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    }
  };

  const createTos = async () => {
    try {
      const response = await ApiCalls.createTos({
        payload: {
          tosURI: tosURI,
        },
      });
      toast({
        title: "ToS created",
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
      navigate(`/admin/tos/${response.data.id}`);
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

  return <>Create tos</>;
};

export default CreateTos;
