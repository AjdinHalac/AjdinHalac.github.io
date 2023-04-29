import React from 'react';
import { CCol, CContainer, CRow } from '@coreui/react';

const PageLanding = () => {
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="6">This is where presentation will go!</CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default PageLanding;
