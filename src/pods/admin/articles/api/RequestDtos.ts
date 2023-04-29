export interface IArticleRequestDTO {
    title: string;
    content: string;
    categoryID: number;
    image: string;
    tags: number[];
}

export interface ITagRequestDTO {
    tag: string;
}
