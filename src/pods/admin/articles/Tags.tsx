import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CFormGroup,
    CInput,
    CLabel,
    CCardBody,
    CContainer,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from '@coreui/react';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

import ApiCalls from './api/ApiCalls';
import { ITag } from './interfaces';
import { IPaginator } from '../../system/interfaces';
import { createQueryString, parseError } from '../../../utils/helpers';
import NotificationsProvider from '../../../utils/notifications-provider';

const Tags = () => {
    const history = useHistory();
    const [alert, setAlert] = useState(null);
    const [paginator, setPaginator] = useState<Partial<IPaginator>>({
        perPage: 10,
    });

    const [filterValue, setFilterValue] = useState('');
    const [page, setPage] = useState<number>(1);
    const [tags, setTags] = useState<ITag[]>([]);

    const setFilterValueAndResetPage = (value: string) => {
        setFilterValue(value);
        setPage(1);
    };

    const getTags = async () => {
        try {
            const response = await ApiCalls.getTags(createQueryString({ ...paginator, page, filter: filterValue }));
            setTags(response.data.results || []);
            setPaginator(response.data.paginator);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while getting tags.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const pageChange = (newPage: any) => {
        setPage(newPage);
    };

    const removeTag = async (id: number) => {
        try {
            await ApiCalls.removeTag(id);
            await getTags();
            NotificationsProvider.success('Tag removed.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while removing tag.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const showDeleteTagAlert = (id: number) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete tag!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={async () => {
                    await removeTag(id);
                    hideAlert();
                }}
                onCancel={() => hideAlert()}
            />
        );

        // @ts-ignore
        setAlert(getAlert());
    };

    const hideAlert = () => {
        setAlert(null);
    };

    useEffect(() => {
        getTags();
        // eslint-disable-next-line
    }, [page, filterValue]);

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CFormGroup>
                        <CLabel htmlFor="search">Search</CLabel>
                        <CInput
                            id="search"
                            placeholder="Search by tag"
                            required
                            value={filterValue}
                            onChange={(e) => setFilterValueAndResetPage(e.currentTarget.value)}
                            max={100}
                            min={1}
                        />
                    </CFormGroup>
                </CCol>
                <CCol xs={12}>
                    <CCard>
                        <CCardHeader>Tags</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={tags}
                                fields={[
                                    {
                                        key: 'id',
                                        _classes: 'font-weight-bold',
                                        label: 'ID',
                                    },
                                    'tag',
                                    'slug',
                                    {
                                        key: 'actions',
                                        _classes: 'font-weight-bold',
                                        label: 'Actions',
                                    },
                                ]}
                                itemsPerPage={paginator?.perPage}
                                clickableRows
                                hover
                                onRowClick={(item: ITag) => history.push(`/admin/tags/${item.id}`)}
                                scopedSlots={{
                                    actions: (item: ITag) => (
                                        <td style={{ display: 'flex' }}>
                                            <CButton
                                                style={{ marginLeft: 10 }}
                                                color="danger"
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    showDeleteTagAlert(item?.id);
                                                }}
                                            >
                                                Remove
                                            </CButton>
                                        </td>
                                    ),
                                }}
                            />
                            <CButton
                                style={{ float: 'left', margin: 5 }}
                                color="primary"
                                onClick={() => history.push('/admin/create-tag')}
                            >
                                Create Tag
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

export default Tags;
