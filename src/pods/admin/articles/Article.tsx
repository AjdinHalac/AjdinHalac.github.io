import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CForm,
    CInput,
    CDataTable,
    CLabel,
    CButton,
    CCardFooter,
    CInputFile,
    CProgress,
    CBadge,
    CContainer,
} from '@coreui/react';
import styled from 'styled-components';

import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { MarkdownEditor } from '../../../components/admin';

import ApiCalls from './api/ApiCalls';
import { IArticle, ITag } from './interfaces';
import NotificationsProvider from '../../../utils/notifications-provider';
import PlaceholderIcon from '../../../assets/images/placeholder-icon.svg';
import SystemApiCalls from '../../system/api/ApiCalls';
import axios from 'axios';
import { parseError } from '../../../utils/helpers';

const ImagePlaceholder = styled.div`
    width: 75%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d8dbe0;

    img {
        width: auto;
        height: 90%;
    }
`;

const Article = ({ match }: any) => {
    const history = useHistory();
    const [article, setArticle] = useState<Partial<IArticle>>({ content: '', image: '', title: '' });
    const [tags, setTags] = useState<ITag[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [tagsToCreate, setTagsToCreate] = useState<ITag[]>([]);

    const getTags = async () => {
        try {
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while getting tags.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const getArticle = async () => {
        try {
            const response = await ApiCalls.getArticleById(match.params.id);
            setArticle(response.data);
            setTagsToCreate(response.data.tags);

            const responseTags = await ApiCalls.getTags('perPage=1000');
            setTags(responseTags.data.results);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while getting article.');
            NotificationsProvider.error(errorMessage);
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
                    kind: 'articles',
                },
            });

            const options = {
                headers: {
                    'Content-Type': signedUrlResponse.data.contentType,
                    'Access-Control-Allow-Origin': '*',
                    'x-amz-acl': 'public-read',
                },
            };

            await axios.put(signedUrlResponse.data.url, file, options);
            setIsUploading(false);
            setArticle({ ...article, image: signedUrlResponse.data.accessURL });
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while uploading image.');
            NotificationsProvider.error(errorMessage);
            setIsUploading(false);
            setArticle({ ...article, image: oldArticleImage });
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
            NotificationsProvider.success('Article updated.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while updating article.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const getBadge = (price: number | null | string | boolean) => {
        if (price) {
            return 'success';
        }
        return 'danger';
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

    return (
        <CContainer>
            <CRow>
                <CCol lg={12}>
                    <CCard>
                        <CCardHeader>
                            {tagsToCreate.map((r) => (
                                <CBadge
                                    onClick={() => history.push(`/admin/tags/${r.id}`)}
                                    key={r.id}
                                    color={'success'}
                                    style={{ margin: '5px', padding: '5px', fontSize: '15px' }}
                                >{`${r.tag}`}</CBadge>
                            ))}
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow>
                                    <CCol lg={6} md={6} xs={12}>
                                        <CLabel>
                                            Published at:&nbsp;
                                            <CBadge
                                                color={getBadge(!!article.publishedAt)}
                                            >{`${article.publishedAt}`}</CBadge>
                                        </CLabel>
                                        <CLabel style={{ display: 'block' }}>Article category: &nbsp;</CLabel>
                                        <CLabel>Title</CLabel>
                                        <CInput
                                            value={article.title}
                                            onChange={(e: any) =>
                                                setArticle({ ...article, title: e.currentTarget.value })
                                            }
                                        />
                                    </CCol>
                                    <CCol
                                        lg={6}
                                        md={6}
                                        xs={12}
                                        style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {article.image ? (
                                            <img src={article.image} alt="article img" height={200} width={'auto'} />
                                        ) : (
                                            <ImagePlaceholder>
                                                <img src={PlaceholderIcon} alt="article img placeholder" />
                                            </ImagePlaceholder>
                                        )}

                                        <CInputFile
                                            id="file-input"
                                            name="file-input"
                                            onChange={onImageChange}
                                            style={{ marginTop: 20, width: 'auto' }}
                                        />
                                        {isUploading && (
                                            <CProgress
                                                style={{ width: '50%' }}
                                                animated
                                                striped
                                                color="success"
                                                className="mt-2 mb-1"
                                                value={100}
                                            />
                                        )}
                                    </CCol>
                                </CRow>
                                <CLabel style={{ display: 'block' }}>Content:</CLabel>
                                <MarkdownEditor
                                    keyValue={'content'}
                                    margin={'0 0 20px 0'}
                                    value={article.content}
                                    onChange={(value: string) => {
                                        setArticle({ ...article, content: value });
                                    }}
                                />
                            </CForm>
                            <CCol xs={12} style={{ overflowY: 'scroll', height: '220px' }}>
                                <CDataTable
                                    items={tags}
                                    fields={['tag', 'actions']}
                                    hover
                                    responsive
                                    scopedSlots={{
                                        actions: (item: ITag) => (
                                            <td>
                                                {tagsIncluded(tagsToCreate, item) ? (
                                                    <CButton
                                                        color="danger"
                                                        shape="pill"
                                                        size="sm"
                                                        onClick={(e: any) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setTagsToCreate(
                                                                tagsToCreate.filter(
                                                                    (element) => element.id !== item.id,
                                                                ),
                                                            );
                                                        }}
                                                    >
                                                        <CIcon name="cil-trash"></CIcon>
                                                    </CButton>
                                                ) : (
                                                    <CButton
                                                        color="success"
                                                        shape="pill"
                                                        size="sm"
                                                        onClick={(e: any) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setTagsToCreate((tagsToCreate) => [...tagsToCreate, item]);
                                                        }}
                                                    >
                                                        <CIcon name="cil-check"></CIcon>
                                                    </CButton>
                                                )}
                                            </td>
                                        ),
                                    }}
                                />
                            </CCol>
                        </CCardBody>
                        <CCardFooter>
                            <CButton
                                disabled={!article.title || !article.content || !article.image}
                                type="submit"
                                size="lg"
                                color="primary"
                                onClick={updateArticle}
                            >
                                Save
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Article;
