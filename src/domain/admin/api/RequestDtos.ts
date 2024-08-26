export interface IUserDTO {
    address?: string;
    area?: string;
    bio?: string;
    birthDate?: string;
    city?: string;
    country?: string;
    firstName?: string;
    gender?: string;
    image?: string;
    lastName?: string;
    postCode?: string;
    state?: string;
}

export interface ITosRequestDTO {
    tosURI?: string;
}

export interface IArticleRequestDTO {
    title: string;
    description: string;
    image: string;
    content: string;
    tags: number[];
}

export interface ITagRequestDTO {
    tag: string;
}
