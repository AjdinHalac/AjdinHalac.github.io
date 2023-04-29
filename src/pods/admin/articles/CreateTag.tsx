import React, { useState } from 'react';
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
    CContainer,
} from '@coreui/react';

import ApiCalls from './api/ApiCalls';
import { ITag } from './interfaces';
import NotificationsProvider from '../../../utils/notifications-provider';
import { ErrorMessages } from '../../../enums/error.codes';

const CreateTag = () => {
    const history = useHistory();
    const [tag, setTag] = useState<Partial<ITag>>({
        tag: '',
    });

    const createTag = async () => {
        try {
            const response = await ApiCalls.createTag({
                payload: {
                    tag: tag?.tag,
                },
            });
            NotificationsProvider.success('Tag created.');
            history.push(`/admin/tags/${response.data.id}`);
        } catch (err) {
            NotificationsProvider.error(ErrorMessages.TAG020);
        }
    };

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Create tag</CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CLabel>Title</CLabel>
                                <CInput
                                    width={'50%'}
                                    value={tag.tag}
                                    onChange={(e: any) => setTag({ ...tag, tag: e.currentTarget.value })}
                                />
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="lg" color="primary" disabled={!tag.tag} onClick={createTag}>
                                Create
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default CreateTag;
