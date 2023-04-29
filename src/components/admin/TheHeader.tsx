import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHeader, CToggler, CHeaderBrand, CHeaderNav } from '@coreui/react';

import { TheHeaderDropdown } from './index';

import { cookieService } from '../../services/CookieService';

const TheHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state: any) => state.sidebarShow);

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
        dispatch({ type: 'set', sidebarShow: val });
    };

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
        dispatch({ type: 'set', sidebarShow: val });
    };

    return (
        <CHeader withSubheader>
            {cookieService.isAdmin() && (
                <>
                    <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
                    <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
                    <CHeaderBrand className="mx-auto d-lg-none" to="/" />
                </>
            )}
            <CHeaderNav className="px-3 ml-auto">
                <TheHeaderDropdown />
            </CHeaderNav>
        </CHeader>
    );
};

export default TheHeader;
