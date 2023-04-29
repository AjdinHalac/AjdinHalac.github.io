import { ajaxService } from '../../../../services/AjaxService';
import { IUsersResponseDTO } from './ResponseDtos';
import { IRole, IUser } from '../interfaces';
import { IRequest, IResponse } from '../../../system/interfaces';

export default class ApiCalls {
    public static getUsers(queryParams: string) {
        return ajaxService.get<IResponse<IUsersResponseDTO>>(`/management/users/?${queryParams}`);
    }

    public static getUserById(uuid: string) {
        return ajaxService.get<IResponse<IUser>>(`/management/users/${uuid}`);
    }

    public static updateUser(uuid: string, request: IRequest<Partial<IUser>>) {
        return ajaxService.put<IResponse<IUser>>(`/management/users/${uuid}`, request.payload);
    }

    public static removeUser(uuid: string) {
        return ajaxService.delete<IResponse<any>>(`/management/users/${uuid}`);
    }

    public static getUserRoles(uuid: string) {
        return ajaxService.get<IResponse<IRole[]>>(`/management/users/${uuid}/roles/`);
    }

    public static addUserRole(uuid: string, roleID: number) {
        return ajaxService.put<IResponse<any>>(`/management/users/${uuid}/roles/${roleID}`);
    }

    public static removeUserRole(uuid: string, roleID: number) {
        return ajaxService.delete<IResponse<any>>(`/management/users/${uuid}/roles/${roleID}`);
    }

    public static getRoles() {
        return ajaxService.get<IResponse<IRole[]>>(`/management/roles/`);
    }
}
