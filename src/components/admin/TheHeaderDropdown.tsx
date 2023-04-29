import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { authService } from '../../services/AuthService';
import AdminAvatar from '../../assets/images/admin-avatar.jpg';

const TheHeaderDropdown = () => {
    const logout = async () => {
        await authService.logout();
    };

    return (
        <CDropdown inNav className="c-header-nav-items mx-2">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg src={AdminAvatar} className="c-avatar-img" alt="admin-avatar" />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
         */}
                {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem> */}
                <CDropdownItem divider />
                <CDropdownItem onClick={logout}>
                    <CIcon name="cil-lock-locked" className="mfe-2" />
                    Log Out
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default TheHeaderDropdown;
