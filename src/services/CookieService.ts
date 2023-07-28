import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';

type cookieNameType = 'localhost-frontend' | 'frontend';

export const COOKIE_NAME: cookieNameType = window.location.hostname === 'localhost' ? 'localhost-frontend' : 'frontend';

const COOKIE_DOMAIN = 'ajdinhalac.github.com';

class CookieService {
    setCookie(cValue: string, durationDays: number) {
        const d = new Date();
        d.setTime(d.getTime() + durationDays * 24 * 60 * 60 * 1000);

        if (window.location.hostname === 'localhost') {
            cookie.save(`${COOKIE_NAME}`, `${cValue}`, { path: '/', expires: d });
        } else {
            cookie.save(`${COOKIE_NAME}`, `${cValue}`, {
                path: '/',
                expires: d,
                domain: `${COOKIE_DOMAIN}`,
                secure: true,
            });
        }
    }

    getCookie() {
        return cookie.load(`${COOKIE_NAME}`) || null;
    }

    removeCookie() {
        if (window.location.hostname === 'localhost') {
            cookie.remove(`${COOKIE_NAME}`, { path: '/' });
        } else {
            cookie.remove(`${COOKIE_NAME}`, { path: '/', domain: `${COOKIE_DOMAIN}` });
        }
    }

    getRoles(): any {
        if (this.isAuthenticated()) {
            const decoded: any = jwt_decode(this.getCookie().accessToken);
            return decoded?.scope || '';
        }
        return '';
    }

    isAdmin(): any {
        return this.getRoles().indexOf('Admin') > -1;
    }

    public isAuthenticated() {
        return !!this.getCookie()?.accessToken;
    }
}

export const cookieService = new CookieService();
