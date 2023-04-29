import { IArticle, ITag } from '../interfaces';
import { IPaginator } from '../../../system/interfaces';

export interface IArticlesResponseDTO {
    results: IArticle[];
    paginator: IPaginator;
}

export interface ITagsResponseDTO {
    results: ITag[];
    paginator: IPaginator;
}
