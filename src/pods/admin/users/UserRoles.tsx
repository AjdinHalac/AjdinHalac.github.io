import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CButton, CCardHeader, CCardBody, CCardFooter, CForm, CLabel, CRow, CCol, CContainer } from '@coreui/react';

import { IRole } from './interfaces';
import ApiCalls from './api/ApiCalls';
import { parseError } from '../../../utils/helpers';
import NotificationsProvider from '../../../utils/notifications-provider';

const UserRoles = ({ match }: any) => {
    const history = useHistory();
    const [userRoles, setUserRoles] = useState<IRole[]>([]);
    const [roles, setRoles] = useState<IRole[]>([]);

    const userHasRole = (roleID: number): boolean => {
        return !!userRoles.find((r) => r.id === roleID);
    };

    const getRoles = async () => {
        try {
            const response = await ApiCalls.getRoles();
            setRoles(response.data);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while getting roles.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const getUserRoles = async (uuid: string) => {
        try {
            const response = await ApiCalls.getUserRoles(uuid);
            setUserRoles(response.data);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while getting user roles.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const addUserRole = async (uuid: string, roleID: number) => {
        try {
            await ApiCalls.addUserRole(uuid, roleID);
            loadData();
            NotificationsProvider.success('Role added.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while adding role to user.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const removeUserRole = async (uuid: string, roleID: number) => {
        try {
            await ApiCalls.removeUserRole(uuid, roleID);
            loadData();
            NotificationsProvider.success('Role removed.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while removing user role.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const loadData = async () => {
        await getRoles();
        await getUserRoles(match.params.id);
    };

    useEffect(() => {
        loadData();
        //eslint-disable-next-line
    }, []);

    return (
        <CContainer>
            <CRow>
                <CCol xs={12}>
                    <CCardHeader>User id: {match.params.id}</CCardHeader>
                    <CCardBody>
                        <CForm>
                            <CLabel style={{ display: 'block', fontWeight: 700, textDecoration: 'underline' }}>
                                Roles:
                            </CLabel>
                            {roles.map((r) => (
                                <CRow
                                    key={r.id}
                                    style={{ margin: '0 0 5px 0', width: '75%', justifyContent: 'space-between' }}
                                >
                                    <div>{r.name}</div>
                                    {!userHasRole(r.id) ? (
                                        <CButton
                                            color="primary"
                                            onClick={async () => {
                                                await addUserRole(match.params.id, r.id);
                                            }}
                                        >
                                            Add
                                        </CButton>
                                    ) : (
                                        <CButton
                                            color="primary"
                                            onClick={async () => {
                                                await removeUserRole(match.params.id, r.id);
                                            }}
                                        >
                                            Remove
                                        </CButton>
                                    )}
                                </CRow>
                            ))}
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        <CButton color="secondary" onClick={() => history.goBack()}>
                            Back
                        </CButton>
                    </CCardFooter>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default UserRoles;
