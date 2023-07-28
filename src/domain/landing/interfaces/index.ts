export interface IRequest<T> {
    queryParams?: string;
    payload?: Partial<T>;
}

export interface IResponse<T> {
    data: T;
}

export interface IPaginator {
    currentEntriesSize: number;
    filter: string;
    offset: number;
    orderBy: string;
    orderDir: string;
    groupBy: string;
    page: number;
    perPage: number;
    totalEntriesSize: number;
    totalPages: number;
    fromDate: string;
    toDate: string;
}

export interface IArticle {
    id: number;
    slug: string;
    title: string;
    content: string;
    image: string;
    userID: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    publishedAt: string | Date;
    tags: ITag[];
}

export interface ITag {
    id: number;
    slug: string;
    tag: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    articles: IArticle[];
}

export interface IExperience {
    value: string;
    position: string;
    company: string;
    duration: string;
    image: string;
    listItems: string[];
}
