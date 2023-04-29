import { ajaxService } from '../../../../services/AjaxService';
import { IArticlesResponseDTO, ITagsResponseDTO } from './ResponseDtos';
import { IArticle, ITag } from '../interfaces';
import { IArticleRequestDTO, ITagRequestDTO } from './RequestDtos';
import { IRequest, IResponse } from '../../../system/interfaces';

export default class ApiCalls {
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
