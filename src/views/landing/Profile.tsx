import { ReactElement } from 'react';
import { cookieService } from '../../services/CookieService';

const Profile = (): ReactElement => {
  if (!cookieService.isAuthenticated()) {
    window.location.replace("/");
  }

    return <>Profile</>
};

export default Profile;
