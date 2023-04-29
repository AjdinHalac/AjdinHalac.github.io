import { IUserMetrics } from '../interfaces';
import { IPaginator } from '../../../system/interfaces';

export interface IUserMetricsResponseDTO {
    results: IUserMetrics[];
    paginator: IPaginator;
}
