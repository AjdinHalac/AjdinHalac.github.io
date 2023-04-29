import { cookieService } from './CookieService';
import { ajaxService } from './AjaxService';
import config from '../config';
import ApiCalls from '../pods/auth/api/ApiCalls';
import { parseError } from '../utils/helpers';
import NotificationsProvider from '../utils/notifications-provider';

class AuthService {
    public async logout() {
        try {
            const cookie = cookieService.getCookie();

            await ApiCalls.logout({ payload: { token: cookie?.refreshToken } });
            cookieService.removeCookie();
            ajaxService.setAuthToken(null, null);
            window.location.assign(`${config.ADMIN_APP_URL}`);
        } catch (err) {
            const error = parseError(err, 'Error occured on log out');
            NotificationsProvider.error(error);
        }
    }
}

export const authService = new AuthService();
