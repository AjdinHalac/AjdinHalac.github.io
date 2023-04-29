import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavItem,
    CImg,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilPeople, cilSpreadsheet, cilNewspaper, cilTags } from '@coreui/icons';
import LogoGreen from '../../assets/images/logo-green.png';
import { useHistory } from 'react-router-dom';

const TheSidebar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const show = useSelector((state: any) => state.sidebarShow);

    return (
        <CSidebar show={show} onShowChange={(val: any) => dispatch({ type: 'set', sidebarShow: val })}>
            <CSidebarBrand className="d-md-down-none" to="/">
                <CImg className="c-sidebar-brand-full" name="logo-negative" height={35} src={LogoGreen} />
            </CSidebarBrand>
            <CSidebarNav>
                <CSidebarNavTitle>Dasboard</CSidebarNavTitle>
                <CSidebarNavItem to="/admin/dashboard">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    Dashboard
                </CSidebarNavItem>
                <CSidebarNavTitle>Users</CSidebarNavTitle>
                <CSidebarNavItem to="/admin/users">
                    <CIcon customClassName="nav-icon" icon={cilPeople} />
                    Users
                    <CSidebarNavTitle>ToS</CSidebarNavTitle>
                </CSidebarNavItem>
                <CSidebarNavItem to="/admin/tos" name="Terms of Service">
                    <CIcon customClassName="nav-icon" icon={cilSpreadsheet} />
                    Terms of Service
                </CSidebarNavItem>
                <CSidebarNavDivider></CSidebarNavDivider>
                <CSidebarNavTitle>Articles</CSidebarNavTitle>
                <CSidebarNavItem to="/admin/articles" name="Articles">
                    <CIcon customClassName="nav-icon" icon={cilNewspaper} />
                    Articles
                </CSidebarNavItem>
                <CSidebarNavItem to="/admin/tags" name="Tags">
                    <CIcon customClassName="nav-icon" icon={cilTags} />
                    Tags
                </CSidebarNavItem>
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    );
};

export default React.memo(TheSidebar);
