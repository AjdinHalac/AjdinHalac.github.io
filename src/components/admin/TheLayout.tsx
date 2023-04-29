import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { TheContent, TheSidebar, TheHeader } from './index';

import { cookieService } from '../../services/CookieService';

import 'react-toastify/dist/ReactToastify.css';

const TheLayout = () => {
    const history = useHistory();

    useLayoutEffect(() => {
        if (!cookieService.isAdmin()) {
            return history.push('/unauthorized');
        }
        //eslint-disable-next-line
    }, []);

    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">
                <TheHeader />
                <div className="c-body">
                    <TheContent />
                </div>
            </div>
        </div>
    );
};

export default TheLayout;
