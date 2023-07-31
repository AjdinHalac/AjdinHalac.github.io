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

export interface IUser {
    uuid: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    profileImage: string;
    gender: number;
    bio: string;
    country: string;
    state: string;
    area: string;
    city: string;
    address: string;
    postCode: string;
    birthDate: Date | string;
    invitedByUserID: number;
    tosAccepted: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface IRole {
    id: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    description: string;
    name: string;
}

export interface ITos {
    id: number;
    tosURI: string;
    createdAt: string | Date;
    updatedAt: string | Date;
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
