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
