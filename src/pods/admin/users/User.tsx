import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CContainer, CButton } from '@coreui/react';

import ApiCalls from './api/ApiCalls';

import { IUser } from './interfaces';
import { parseError } from '../../../utils/helpers';
import NotificationsProvider from '../../../utils/notifications-provider';

const User = ({ match }: any) => {
    const history = useHistory();
    const [user, setUser] = useState<IUser>();

    const getUser = async () => {
        try {
            const responseUser = await ApiCalls.getUserById(match.params.id);
            setUser(responseUser.data);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while getting user.');
            NotificationsProvider.error(errorMessage);
        }
    };

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);

    if (!user) {
        return <div />;
    }

    return (
        <CContainer>
            <CRow>
                <CCol lg={12}>
                    <CCard>
                        <CCardHeader>
                            User id: {match.params.id}
                            <CButton
                                color="success"
                                onClick={() => history.push(`/admin/users/role-management/${match.params.id}`)}
                            >
                                Edit roles
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td>UUID</td>
                                        <td>
                                            <strong>{user?.uuid}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>
                                            <strong>
                                                {user?.firstName} {user?.lastName}
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>
                                            <strong>{user?.gender}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>
                                            <strong>{user?.email}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email verified</td>
                                        <td>
                                            <strong>{user?.emailVerified ? 'Yes' : 'No'}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default User;
