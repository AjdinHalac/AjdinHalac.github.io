import { ajaxService } from '../../../../services/AjaxService';
import { IUserMetrics } from '../interfaces';
import { IUserMetricsResponseDTO } from './ResponseDtos';

export interface IRequest<T> {
    queryParams?: string;
    payload?: Partial<T>;
}

export interface IResponse<T> {
    data: T;
}

export default class ApiCalls {
    public static getUserMetrics(queryParams: string) {
        return ajaxService.get<IResponse<IUserMetricsResponseDTO>>(`/management/userMetrics/?${queryParams}`);
    }

    public static getUserMetric(id: number) {
        return ajaxService.get<IResponse<IUserMetrics>>(`/management/userMetrics/${id}`);
    }
}
