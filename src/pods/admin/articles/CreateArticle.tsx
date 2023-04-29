import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CInput,
    CLabel,
    CRow,
    CCardFooter,
    CButton,
    CForm,
    CInputFile,
    CProgress,
    CContainer,
} from '@coreui/react';
import styled from 'styled-components';
import axios from 'axios';

import { MarkdownEditor } from '../../../components/admin';

import ApiCalls from './api/ApiCalls';
import SystemApiCalls from '../../system/api/ApiCalls';
import { IArticle } from './interfaces';
import NotificationsProvider from '../../../utils/notifications-provider';
import PlaceholderIcon from '../../../assets/images/placeholder-icon.svg';
import { parseError } from '../../../utils/helpers';
import { ErrorMessages } from '../../../enums/error.codes';

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

const CreateArticle = () => {
    const history = useHistory();
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [article, setArticle] = useState<Partial<IArticle>>({
        content: '',
        image: '',
        title: '',
    });

    const onImageChange = async (e: any) => {
        setIsUploading(true);

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
            setImageUrl(signedUrlResponse.data.accessURL);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while uploading image.');
            NotificationsProvider.error(errorMessage);
            setIsUploading(false);
            setImageUrl('');
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
            NotificationsProvider.success('Article created.');
            history.push(`/admin/articles/${response.data.slug}`);
        } catch (err) {
            NotificationsProvider.error(ErrorMessages.ARTICLE020);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
    }, []);

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Create article</CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow>
                                    <CCol lg={6} md={6} xs={12}>
                                        <CLabel>Title</CLabel>
                                        <CInput
                                            style={{ marginBottom: 10 }}
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
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="article img" height={200} width={'auto'} />
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
                        </CCardBody>
                        <CCardFooter>
                            <CButton
                                type="submit"
                                size="lg"
                                color="primary"
                                disabled={!article.title || !article.content || !imageUrl}
                                onClick={createArticle}
                            >
                                Create
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default CreateArticle;
