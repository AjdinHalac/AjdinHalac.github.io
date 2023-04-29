import { ajaxService } from '../../../services/AjaxService';
import { IUploadRequestDTO } from './RequestDtos';
import { IUploadResponseDTO } from './ResponseDtos';
import { IRequest, IResponse } from '../interfaces';

export default class ApiCalls {
    public static getSignedUrlForUpload(request: IRequest<IUploadRequestDTO>) {
        return ajaxService.post<IResponse<IUploadResponseDTO>>('/account/upload', request.payload);
    }
}
