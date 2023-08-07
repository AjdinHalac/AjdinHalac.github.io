import { ajaxService } from '../../../services/AjaxService';
import { IRequest, IResponse, IUser } from '../interfaces';

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
}
