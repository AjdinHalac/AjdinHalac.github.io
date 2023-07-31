import { IUser, IRole, ITos, IArticle, ITag, IPaginator } from '../../common/interfaces';
import { IUserMetrics } from '../interfaces';

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

export interface ITosListResponseDTO {
    results: ITos[];
    paginator: IPaginator;
}

export interface IUserMetricsResponseDTO {
    results: IUserMetrics[];
    paginator: IPaginator;
}

export interface IArticlesResponseDTO {
    results: IArticle[];
    paginator: IPaginator;
}

export interface ITagsResponseDTO {
    results: ITag[];
    paginator: IPaginator;
}
