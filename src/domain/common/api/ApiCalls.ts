import { ajaxService } from '../../../services/AjaxService';
import { IRequest, IResponse, IScore, IUser } from '../interfaces';

export default class ApiCalls {
    public static getMe() {
        return ajaxService.get<IResponse<IUser>>(`/me/`);
    }

    public static updateMe(request: IRequest<Partial<IUser>>) {
        return ajaxService.put<IResponse<IUser>>(`/me/`, request.payload);
    }

    public static submitFlag(flag: string) {
        return ajaxService.post<IResponse<any>>(`/me/submit-flag/${flag}`);
    }

    public static deleteMe(token: string) {
        return ajaxService.delete<IResponse<any>>(`/me/`, {
            token: token,
        });
    }

    public static changePassword(token: string, newPassword: string) {
        return ajaxService.post<IResponse<any>>(`/me/change-password`, {
            token: token,
            password: newPassword
        });
    }

    public static sudoPassword(currentPassword: string) {
        return ajaxService.post<IResponse<string>>(`/me/sudo-password`, {
            password: currentPassword
        });
    }
    
    public static getScores() {
        return ajaxService.get<IResponse<IScore[]>>(`/leaderboard/`);
    }

    public static submitScore(request: IRequest<Partial<IScore>>) {
        return ajaxService.post<IResponse<IScore>>(`/leaderboard/`, request.payload);
    }
}
