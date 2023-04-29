import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CContainer, CCol, CDataTable, CRow } from '@coreui/react';
import { useHistory } from 'react-router-dom';

import ApiCalls from './api/ApiCalls';
import { ITos } from './interfaces';
import { IPaginator } from '../../system/interfaces';
import { createQueryString, parseError } from '../../../utils/helpers';
import NotificationsProvider from '../../../utils/notifications-provider';

const TosList = () => {
    const history = useHistory();
    const [paginator, setPaginator] = useState<Partial<IPaginator>>({
        perPage: 10,
    });
    const [page, setPage] = useState<number>(1);
    const [tosList, setTosList] = useState<ITos[]>([]);

    const getTosList = async () => {
        try {
            const response = await ApiCalls.getTosList(createQueryString({ ...paginator, page }));
            setTosList(response.data.results || []);
            setPaginator(response.data.paginator);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while getting ToS files.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const pageChange = (newPage: any) => {
        setPage(newPage);
    };

    useEffect(() => {
        getTosList();
        // eslint-disable-next-line
    }, [page]);

    return (
        <CContainer>
            <CRow>
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>Tos List</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={tosList}
                                fields={[
                                    {
                                        key: 'id',
                                        _classes: 'font-weight-bold',
                                        label: 'ID',
                                    },
                                    'tosURI',
                                    'createdAt',
                                ]}
                                itemsPerPage={paginator?.perPage}
                                clickableRows
                                hover
                                onRowClick={(item: ITos) => history.push(`/admin/tos/${item.id}`)}
                            />
                            <CButton
                                style={{ float: 'left', margin: 5 }}
                                color="primary"
                                onClick={() => history.push('/admin/create-tos')}
                            >
                                Create Tos
                            </CButton>
                            <CButton
                                style={{ float: 'right', margin: 5 }}
                                disabled={!!(paginator && paginator.totalPages && page === paginator.totalPages)}
                                color="secondary"
                                onClick={() => pageChange(page + 1)}
                            >
                                Next
                            </CButton>
                            <CButton
                                style={{ float: 'right', margin: 5 }}
                                disabled={page === 1}
                                color="secondary"
                                onClick={() => pageChange(page - 1)}
                            >
                                Previous
                            </CButton>
                        </CCardBody>
                        {alert}
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default TosList;
