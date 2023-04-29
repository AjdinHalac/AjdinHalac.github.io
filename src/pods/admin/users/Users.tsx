import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CInput,
    CLabel,
    CFormGroup,
    CButton,
    CContainer,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from '@coreui/react';
import SweetAlert from 'react-bootstrap-sweetalert';

import ApiCalls from './api/ApiCalls';
import { IUser } from './interfaces';
import { IPaginator } from '../../system/interfaces';
import { createQueryString, parseError } from '../../../utils/helpers';
import NotificationsProvider from '../../../utils/notifications-provider';

const Users = () => {
    const history = useHistory();
    const params = new URLSearchParams(useLocation().search);
    const [perPage, setPerPage] = useState<number>(params.get('perPage') ? Number(params.get('perPage')) : 10);
    const [page, setPage] = useState<number>(params.get('page') ? Number(params.get('page')) : 1);
    const [orderBy, setOrderBy] = useState<string>(
        params.get('orderBy') ? String(params.get('orderBy')) : 'created_at',
    );
    const [orderDir, setOrderDir] = useState<string>(params.get('orderDir') ? String(params.get('orderDir')) : 'DESC');
    const [filter, setFilter] = useState<string>(params.get('filter') ? String(params.get('filter')) : '');
    const [paginator, setPaginator] = useState<Partial<IPaginator>>({
        perPage: perPage,
        page: page,
        orderBy: orderBy,
        orderDir: orderDir,
        filter: filter,
    });
    const [alert, setAlert] = useState(null);
    const [users, setUsers] = useState<IUser[]>([]);

    const pageChange = (newPage: any) => {
        setPage(newPage);
    };

    const setFilterValueAndResetPage = (value: string) => {
        setFilter(value);
        setPage(1);
    };

    const getUsers = async () => {
        try {
            const query = createQueryString({
                perPage: perPage,
                page: page,
                orderBy: orderBy,
                orderDir: orderDir,
                filter: filter,
            });
            const response = await ApiCalls.getUsers(query);
            setUsers(response.data.results || []);
            setPaginator(response.data.paginator);
            history.push(`/admin/users?${query}`);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while getting users.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const removeUser = async (uuid: string) => {
        try {
            await ApiCalls.removeUser(uuid);
            await getUsers();
            NotificationsProvider.success('User removed.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while removing user.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const showDeleteUserAlert = (uuid: string) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete user!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={async () => {
                    await removeUser(uuid);
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
        getUsers();
        // eslint-disable-next-line
    }, [perPage, page, orderBy, orderDir, filter]);

    return (
        <CContainer>
            <CRow>
                <CCol xs={12}>
                    <CFormGroup>
                        <CLabel htmlFor="search">Search</CLabel>
                        <CInput
                            id="search"
                            placeholder="Search by name or email"
                            required
                            value={filter}
                            onChange={(e) => setFilterValueAndResetPage(e.currentTarget.value)}
                            max={100}
                            min={1}
                        />
                    </CFormGroup>
                    <CRow>
                        <CDropdown id="perPage">
                            <CDropdownToggle caret>Per page</CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem onClick={() => setPerPage(10)}>10</CDropdownItem>
                                <CDropdownItem onClick={() => setPerPage(25)}>25</CDropdownItem>
                                <CDropdownItem onClick={() => setPerPage(50)}>50</CDropdownItem>
                                <CDropdownItem onClick={() => setPerPage(100)}>100</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        <CDropdown id="orderBy">
                            <CDropdownToggle caret>Order by</CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem onClick={() => setOrderBy('id')}>ID</CDropdownItem>
                                <CDropdownItem onClick={() => setOrderBy('email')}>Email</CDropdownItem>
                                <CDropdownItem onClick={() => setOrderBy('first_name')}>First Name</CDropdownItem>
                                <CDropdownItem onClick={() => setOrderBy('last_name')}>Last Name</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        <CDropdown id="orderDir">
                            <CDropdownToggle caret>Order dir</CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem onClick={() => setOrderDir('ASC')}>ASC</CDropdownItem>
                                <CDropdownItem onClick={() => setOrderDir('DESC')}>DESC</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CRow>
                </CCol>
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>Users</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={users}
                                fields={[
                                    {
                                        key: 'firstName',
                                    },
                                    'lastName',
                                    'email',
                                    'birthDate',
                                    'city',
                                    'country',
                                    'gender',
                                    {
                                        key: 'actions',
                                        _classes: 'font-weight-bold',
                                        label: 'Actions',
                                    },
                                ]}
                                hover
                                responsive
                                striped
                                itemsPerPage={paginator?.perPage}
                                clickableRows
                                onRowClick={(item: IUser) => history.push(`/admin/users/${item.uuid}`)}
                                scopedSlots={{
                                    actions: (item: IUser) => (
                                        <td>
                                            <CButton
                                                color="danger"
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    showDeleteUserAlert(item?.uuid);
                                                }}
                                            >
                                                Remove
                                            </CButton>
                                        </td>
                                    ),
                                }}
                            />
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

export default Users;
