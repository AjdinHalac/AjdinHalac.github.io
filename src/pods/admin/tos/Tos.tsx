import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CLabel, CInput, CCardHeader, CCol, CRow, CForm, CContainer } from '@coreui/react';

import ApiCalls from './api/ApiCalls';
import { ITos } from './interfaces';
import NotificationsProvider from '../../../utils/notifications-provider';
import { parseError } from '../../../utils/helpers';

const Tos = ({ match }: any) => {
    const [tos, setTos] = useState<Partial<ITos>>({ tosURI: '' });

    const getTos = async () => {
        try {
            const response = await ApiCalls.getTos(match.params.id);
            setTos(response.data);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while getting ToS data.');
            NotificationsProvider.error(errorMessage);
        }
    };

    useEffect(() => {
        getTos();
        // eslint-disable-next-line
    }, []);

    return (
        <CContainer>
            <CRow>
                <CCol lg={12}>
                    <CCard>
                        <CCardHeader>Tos id: {match.params.id}</CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow>
                                    <CCol lg={12} md={12} xs={12}>
                                        <CLabel>ToS URI</CLabel>
                                        <CInput value={tos.tosURI} disabled />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Tos;
