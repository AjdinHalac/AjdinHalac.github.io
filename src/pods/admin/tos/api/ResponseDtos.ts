import { ITos } from '../interfaces';
import { IPaginator } from '../../../system/interfaces';

export interface ITosListResponseDTO {
    results: ITos[];
    paginator: IPaginator;
}
