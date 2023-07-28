export interface IUploadRequestDTO {
    contentType: string;
    fileName: string;
    kind: string;
}

export interface IForgotPasswordRequestDTO {
    email: string;
}

export interface IResetPasswordRequestDTO {
    token: string;
    password: string;
}

export interface IAcceptInviteRequestDTO {
    token: string;
    password: string;
}

export interface ILoginRequestDTO {
    email: string;
    password: string;
}

export interface IRegisterRequestDTO {
    email: string;
    password: string;
}

export interface IConfirmEmailRequestDTO {
    token: string;
}

export interface IRefreshTokenRequestDTO {
    token: string;
}

export interface ILogoutRequestDTO {
    token: string;
}
