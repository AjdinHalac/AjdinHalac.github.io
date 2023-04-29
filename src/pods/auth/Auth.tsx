import React, { ReactElement, useLayoutEffect, useState } from 'react';
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
import { parseError } from '../../utils/helpers';
import NotificationsProvider from '../../utils/notifications-provider';
import { ajaxService } from '../../services/AjaxService';

const Auth = (): ReactElement => {
    const history = useHistory();

    const [authMode, setAuthMode] = useState('signin');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useLayoutEffect(() => {
        localStorage.clear();
    }, []);

    const onLoginClick = async () => {
        try {
            const newCredentials = await ApiCalls.login({ payload: { email, password: password } });
            ajaxService.setAuthToken(newCredentials?.data?.accessToken, newCredentials?.data?.refreshToken);
            history.push('/');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while getting user.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const onRegisterClick = async () => {
        try {
            const newCredentials = await ApiCalls.register({ payload: { email, password: password } });
            ajaxService.setAuthToken(newCredentials?.data?.accessToken, newCredentials?.data?.refreshToken);
            history.push('/');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while getting user.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const onForgotPasswordClick = async () => {
        try {
            await ApiCalls.login({ payload: { email, password: '1234' } });
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while getting user.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const changeAuthMode = () => {
        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    };

    if (authMode === 'signin') {
        return (
            <CContainer>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <h3 className="Auth-form-title">Sign In</h3>
                                <div className="text-center">
                                    Not registered yet?{' '}
                                    <span className="link-primary" onClick={changeAuthMode}>
                                        Sign Up
                                    </span>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <CForm>
                                    <CLabel>Email address</CLabel>
                                    <CInput value={email} onChange={(e: any) => setEmail(e.currentTarget.value)} />

                                    <CLabel>Password</CLabel>
                                    <CInput
                                        value={password}
                                        onChange={(e: any) => setPassword(e.currentTarget.value)}
                                    />
                                </CForm>
                            </CCardBody>
                            <CCardFooter>
                                <CButton type="submit" size="lg" color="primary" onClick={onLoginClick}>
                                    Sign In
                                </CButton>

                                <p className="text-center mt-2">
                                    <a onClick={onForgotPasswordClick}> Forgot password?</a>
                                </p>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        );
    }

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="Auth-form-title">Sign Up</h3>
                            <div className="text-center">
                                Already registered?{' '}
                                <span className="link-primary" onClick={changeAuthMode}>
                                    Sign In
                                </span>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CLabel>Email address</CLabel>
                                <CInput value={email} onChange={(e: any) => setEmail(e.currentTarget.value)} />

                                <CLabel>Password</CLabel>
                                <CInput value={password} onChange={(e: any) => setPassword(e.currentTarget.value)} />
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="lg" color="primary" onClick={onRegisterClick}>
                                Sign In
                            </CButton>

                            <p className="text-center mt-2">
                                <a onClick={onForgotPasswordClick}> Forgot password?</a>
                            </p>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Auth;
