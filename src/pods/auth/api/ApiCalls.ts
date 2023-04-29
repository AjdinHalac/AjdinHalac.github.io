import { ajaxService } from '../../../services/AjaxService';
import { IRefreshTokenDTO, ILogoutRequestDTO, ILoginRequestDTO, IRegisterRequestDTO } from './RequestDtos';
import { IAuthResponseDTO } from './ResponseDtos';
import { IRequest, IResponse } from '../../system/interfaces';

export default class ApiCalls {
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

    public static refreshToken(request: IRequest<IRefreshTokenDTO>) {
        return ajaxService.post<IResponse<IAuthResponseDTO>>('/me/refresh-token', request.payload, {
            noAuthentication: true,
        });
    }

    public static logout(request: IRequest<ILogoutRequestDTO>) {
        return ajaxService.post<IResponse<any>>('/me/logout', request.payload);
    }
}
