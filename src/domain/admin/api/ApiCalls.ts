import { ajaxService } from '../../../services/AjaxService';
import { ITosRequestDTO, IArticleRequestDTO, ITagRequestDTO } from './RequestDtos';
import {
    IUsersResponseDTO,
    ITosListResponseDTO,
    IUserMetricsResponseDTO,
    IArticlesResponseDTO,
    ITagsResponseDTO,
} from './ResponseDtos';
import { IUserMetrics } from '../interfaces';
import { IRequest, IResponse, IRole, IUser, ITos, IArticle, ITag } from '../../common/interfaces';

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

    public static getTosList(queryParams: string) {
        return ajaxService.get<IResponse<ITosListResponseDTO>>(`/management/tos/?${queryParams}`);
    }

    public static getTos(id: number) {
        return ajaxService.get<IResponse<ITos>>(`/management/tos/${id}`);
    }

    public static createTos(request: IRequest<ITosRequestDTO>) {
        return ajaxService.post<IResponse<ITos>>(`/management/tos/`, request.payload);
    }

    public static getUserMetrics(queryParams: string) {
        return ajaxService.get<IResponse<IUserMetricsResponseDTO>>(`/management/userMetrics/?${queryParams}`);
    }

    public static getUserMetric(id: number) {
        return ajaxService.get<IResponse<IUserMetrics>>(`/management/userMetrics/${id}`);
    }

    public static createArticle(request: IRequest<IArticleRequestDTO>) {
        return ajaxService.post<IResponse<IArticle>>('/management/articles/', request.payload);
    }

    public static getArticles(queryParams: string) {
        return ajaxService.get<IResponse<IArticlesResponseDTO>>(`/management/articles/?${queryParams}`);
    }

    public static getArticleById(slug: string) {
        return ajaxService.get<IResponse<IArticle>>(`/management/articles/${slug}`);
    }

    public static updateArticle(slug: string, request: IRequest<IArticleRequestDTO>) {
        return ajaxService.put<IResponse<IArticle>>(`/management/articles/${slug}`, request.payload);
    }

    public static publishArticle(slug: string) {
        return ajaxService.patch<IResponse<any>>(`/management/articles/${slug}`);
    }

    public static removeArticle(slug: string) {
        return ajaxService.delete<IResponse<any>>(`/management/articles/${slug}`);
    }

    public static createTag(request: IRequest<ITagRequestDTO>) {
        return ajaxService.post<IResponse<ITag>>('/management/tags/', request.payload);
    }

    public static getTags(queryParams: string) {
        return ajaxService.get<IResponse<ITagsResponseDTO>>(`/management/tags/?${queryParams}`);
    }

    public static getTagById(id: number) {
        return ajaxService.get<IResponse<ITag>>(`/management/tags/${id}`);
    }

    public static updateTag(id: number, request: IRequest<ITagRequestDTO>) {
        return ajaxService.put<IResponse<ITag>>(`/management/tags/${id}`, request.payload);
    }

    public static removeTag(id: number) {
        return ajaxService.delete<IResponse<any>>(`/management/tags/${id}`);
    }
}
