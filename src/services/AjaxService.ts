import axios, { AxiosRequestConfig } from 'axios';

import { cookieService } from './CookieService';

import config from '../config';
import ApiCalls from '../domain/landing/api/ApiCalls';
import { authService } from './AuthService';

export interface IInvokeOptions {
    noAuthentication?: boolean;
    background?: boolean;
    headers?: any;
}

export default class AjaxService {
    private accessToken?: string | null;

    constructor() {
        this.init();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        axios.interceptors.response.use(
            (response) => {
                return response.data;
            },
            async function (error) {
                const originalRequest: any = error.config;

                if (error?.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const cookieData = cookieService.getCookie();

                    try {
                    const newCredentials = await ApiCalls.refreshToken({
                        payload: { token: cookieData?.refreshToken },
                    });

                    axios.defaults.headers.common['Content-Type'] = 'application/json';
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + newCredentials.data.accessToken;

                    originalRequest.headers['Content-Type'] = 'application/json';
                    originalRequest.headers['Authorization'] = 'Bearer ' + newCredentials.data.accessToken;

                    self.setAuthToken(newCredentials?.data?.accessToken, newCredentials?.data?.refreshToken);
                    return axios(originalRequest);
                    } catch (err) {
                        authService.logout();
                    }
                }

                if (error?.response?.status === 401) {
                    cookieService.removeCookie();
                    return window.location.assign(`${config.ADMIN_APP_URL}/auth`);
                }

                return Promise.reject(error);
            },
        );
    }

    init(): void {
        const cookieData = cookieService.getCookie();
        this.setAuthToken(cookieData?.accessToken, cookieData?.refreshToken);
    }

    setAuthToken(newAccessToken: string | null, newRefreshToken: string | null): void {
        const newCookieData = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };

        cookieService.setCookie(JSON.stringify(newCookieData), 30);
        this.accessToken = newAccessToken;
    }

    public get endpoint(): string {
        return this.basePath;
    }

    private get basePath(): string {
        return config.API_BASE_URL;
    }

    private get defaultHeaders() {
        const cookieData = cookieService.getCookie();
        const token = cookieData?.accessToken;

        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }

    // eslint-disable-next-line
    private invoke<T>(method: string, url: string, data?: any, options?: IInvokeOptions) {
        let defaultHeaders = this.defaultHeaders;

        if (options && options.headers) {
            defaultHeaders = { ...defaultHeaders, ...options.headers };
        }

        return axios({
            method,
            url: `${this.basePath}${url}`,
            headers: defaultHeaders,
            data,
        } as AxiosRequestConfig) as Promise<any>;
    }

    // eslint-disable-next-line
    public get<T = any>(url: string, options?: IInvokeOptions): Promise<T> {
        return this.invoke<T>('GET', url, null, options);
    }

    // eslint-disable-next-line
    public post<T = any>(url: string, data: any = null, options?: IInvokeOptions): Promise<T> {
        return this.invoke<T>('POST', url, data, options);
    }

    // eslint-disable-next-line
    public put<T = any>(url: string, data?: any, options?: IInvokeOptions): Promise<T> {
        return this.invoke<T>('PUT', url, data, options);
    }

    // eslint-disable-next-line
    public patch<T = any>(url: string, data?: any, options?: IInvokeOptions): Promise<T> {
        return this.invoke<T>('PATCH', url, data, options);
    }

    // eslint-disable-next-line
    public head<T = any>(url: string, options?: IInvokeOptions): Promise<T> {
        return this.invoke<T>('HEAD', url, null, options);
    }

    // eslint-disable-next-line
    public delete<T = any>(url: string, data?: any, options?: IInvokeOptions): Promise<T> {
        return this.invoke('DELETE', url, data, options);
    }
}

export const ajaxService = new AjaxService();
