import { ajaxService } from '../../../services/AjaxService';
import {
    IUploadRequestDTO,
    IRefreshTokenRequestDTO,
    ILogoutRequestDTO,
    ILoginRequestDTO,
    IRegisterRequestDTO,
    IForgotPasswordRequestDTO,
    IAcceptInviteRequestDTO,
    IConfirmEmailRequestDTO,
    IResetPasswordRequestDTO,
} from './RequestDtos';
import { IUploadResponseDTO, IAuthResponseDTO, IArticlesResponseDTO } from './ResponseDtos';
import { IRequest, IResponse } from '../../common/interfaces';

export default class ApiCalls {
    public static getSignedUrlForUpload(request: IRequest<IUploadRequestDTO>) {
        return ajaxService.post<IResponse<IUploadResponseDTO>>('/account/upload', request.payload);
    }

    public static forgotPassword(request: IRequest<IForgotPasswordRequestDTO>) {
        return ajaxService.post<IResponse<any>>('/me/forgot-password', request.payload, {
            noAuthentication: true,
        });
    }

    public static resetPassword(request: IRequest<IResetPasswordRequestDTO>) {
        return ajaxService.post<IResponse<any>>('/me/reset-password', request.payload, {
            noAuthentication: true,
        });
    }

    public static acceptInvite(request: IRequest<IAcceptInviteRequestDTO>) {
        return ajaxService.post<IResponse<any>>('/me/accept-invite', request.payload, {
            noAuthentication: true,
        });
    }

    public static confirmEmail(request: IRequest<IConfirmEmailRequestDTO>) {
        return ajaxService.post<IResponse<any>>('/me/confirm-email', request.payload, {
            noAuthentication: true,
        });
    }

    public static login(request: IRequest<ILoginRequestDTO>) {
        return ajaxService.post<IResponse<IAuthResponseDTO>>('/me/login', request.payload, {
            noAuthentication: true,
        });
    }

    public static register(request: IRequest<IRegisterRequestDTO>) {
        return ajaxService.post<IResponse<IAuthResponseDTO>>('/me/register', request.payload, {
            noAuthentication: true,
        });
    }

    public static refreshToken(request: IRequest<IRefreshTokenRequestDTO>) {
        return ajaxService.post<IResponse<IAuthResponseDTO>>('/me/refresh-token', request.payload, {
            noAuthentication: true,
        });
    }

    public static logout(request: IRequest<ILogoutRequestDTO>) {
        return ajaxService.post<IResponse<any>>('/me/logout', request.payload);
    }

    public static getArticles(queryParams?: string) {
        return ajaxService.get<IResponse<IArticlesResponseDTO>>(`/articles/` + (queryParams ? `?${queryParams}` : ''));
    }
}
