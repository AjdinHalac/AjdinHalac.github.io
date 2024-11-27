import { cookieService } from './CookieService';
import { ajaxService } from './AjaxService';
import ApiCalls from '../domain/landing/api/ApiCalls';

export default class AuthService {
    public async logout() {
        try {
            await ApiCalls.logout({ payload: { token: cookieService.getCookie()?.refreshToken } });
        } catch (err) {
        } finally {
            ajaxService.setAuthToken(null, null);
            window.location.replace('/#/');
        }
    }
}

export const authService = new AuthService();
