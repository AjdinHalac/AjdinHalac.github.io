import { ajaxService } from '../../../../services/AjaxService';
import { ITos } from '../interfaces';
import { ITosListResponseDTO } from './ResponseDtos';
import { ITosRequestDTO } from './RequestDtos';

export interface IRequest<T> {
    queryParams?: string;
    payload?: Partial<T>;
}

export interface IResponse<T> {
    data: T;
}

export default class ApiCalls {
    public static getTosList(queryParams: string) {
        return ajaxService.get<IResponse<ITosListResponseDTO>>(`/management/tos/?${queryParams}`);
    }

    public static getTos(id: number) {
        return ajaxService.get<IResponse<ITos>>(`/management/tos/${id}`);
    }

    public static createTos(request: IRequest<ITosRequestDTO>) {
        return ajaxService.post<IResponse<ITos>>(`/management/tos/`, request.payload);
    }
}
