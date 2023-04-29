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
