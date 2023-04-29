import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CInput,
    CRow,
    CCardFooter,
    CButton,
    CForm,
    CInputFile,
    CProgress,
    CContainer,
} from '@coreui/react';
import axios from 'axios';

import ApiCalls from './api/ApiCalls';
import SystemApiCalls from '../../system/api/ApiCalls';
import NotificationsProvider from '../../../utils/notifications-provider';
import { parseError } from '../../../utils/helpers';

const CreateTos = () => {
    const history = useHistory();
    const [isUploading, setIsUploading] = useState(false);
    const [tosURI, setTosUrl] = useState<string>('');

    const onTosChange = async (e: any) => {
        setIsUploading(true);

        const file = e.target.files[0];

        try {
            const signedUrlResponse = await SystemApiCalls.getSignedUrlForUpload({
                payload: {
                    contentType: file.type,
                    fileName: file.name,
                    kind: 'tos',
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
            setTosUrl(signedUrlResponse.data.accessURL);
        } catch (err) {
            setIsUploading(false);
            setTosUrl('');
            const errorMessage = parseError(err, 'Error occured while uploading ToS file.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const createTos = async () => {
        try {
            const response = await ApiCalls.createTos({
                payload: {
                    tosURI: tosURI,
                },
            });
            NotificationsProvider.success('Tos created.');
            history.push(`/admin/tos/${response.data.id}`);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while creating ToS.');
            NotificationsProvider.error(errorMessage);
        }
    };

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Create Terms of Service</CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow>
                                    <CCol lg={12} md={12} xs={12}>
                                        <CLabel>ToS URI</CLabel>
                                        <CInput value={tosURI} disabled />
                                        <CInputFile
                                            id="file-input"
                                            name="file-input"
                                            onChange={onTosChange}
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
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton
                                type="submit"
                                size="lg"
                                color="primary"
                                disabled={tosURI === ''}
                                onClick={createTos}
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

export default CreateTos;
