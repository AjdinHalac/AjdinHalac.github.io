export interface ILoginRequestDTO {
    email: string;
    password: string;
}

export interface IRegisterRequestDTO {
    email: string;
    password: string;
}

export interface IRefreshTokenDTO {
    token: string;
}

export interface ILogoutRequestDTO {
    token: string;
}
