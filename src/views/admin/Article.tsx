import React, { useEffect, useState } from "react";

import { useNavigate, useNavigation } from "react-router-dom";

import SystemApiCalls from "../../domain/landing/api/ApiCalls";
import axios from "axios";
import { parseError } from "../../utils/helpers";
import ApiCalls from "../../domain/admin/api/ApiCalls";
import { IArticle, ITag } from "../../domain/common/interfaces";
import { useToast } from "@chakra-ui/react";

const Article = ({ match }: any) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Partial<IArticle>>({
    content: "",
    image: "",
    title: "",
  });
  const [tags, setTags] = useState<ITag[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [tagsToCreate, setTagsToCreate] = useState<ITag[]>([]);

  const getTags = async () => {
    try {
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

  const getArticle = async () => {
    try {
      const response = await ApiCalls.getArticleById(match.params.id);
      setArticle(response.data);
      setTagsToCreate(response.data.tags);

      const responseTags = await ApiCalls.getTags("perPage=1000");
      setTags(responseTags.data.results);
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

  const onImageChange = async (e: any) => {
    setIsUploading(true);

    const oldArticleImage = article?.image;
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
      setArticle({ ...article, image: signedUrlResponse.data.accessURL });
    } catch (err) {
      setIsUploading(false);
      setArticle({ ...article, image: oldArticleImage });
      toast({
        title: parseError(err),
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    }
  };

  const updateArticle = async () => {
    try {
      await ApiCalls.updateArticle(match.params.id, {
        payload: {
          image: article?.image,
          title: article?.title,
          content: article?.content,
          tags: tagsToCreate.map((tag) => {
            return tag.id;
          }),
        },
      });
      toast({
        title: "Article updated",
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
  const tagsIncluded = (tags: ITag[], tag: ITag) => {
    let found = false;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === tag.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  useEffect(() => {
    getArticle();
    getTags();
    // eslint-disable-next-line
  }, []);

  return <>Article</>;
};

export default Article;
