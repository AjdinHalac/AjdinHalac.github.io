import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CContainer } from '@coreui/react';

const Auth = React.lazy(() => import('../auth/Auth'));

const PageAuth = () => {
    return (
        <main className="c-main">
            <CContainer fluid>
                <Auth />
            </CContainer>
        </main>
    );
};

export default PageAuth;
