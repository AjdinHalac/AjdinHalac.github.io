import { IArticle, IPaginator } from "../../common/interfaces";

export interface IUploadResponseDTO {
    accessURL: string;
    contentType: string;
    expiration: string;
    fileName: string;
    kind: string;
    url: string;
}

export interface IAuthResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export interface IArticlesResponseDTO {
    results: IArticle[];
    paginator: IPaginator;
}