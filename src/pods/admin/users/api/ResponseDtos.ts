import { IUser, IRole } from '../interfaces';
import { IPaginator } from '../../../system/interfaces';

export interface IUserResponseDTO {
    user: IUser;
}

export interface IUsersResponseDTO {
    results: IUser[];
    paginator: IPaginator;
}

export interface IUserRolesResponseDTO {
    results: IRole[];
    paginator: IPaginator;
}
