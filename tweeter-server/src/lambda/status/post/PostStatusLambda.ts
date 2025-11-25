import {
  PutItemRequest,
  Status,
  StatusDto,
  TweeterResponse,
} from "tweeter-shared";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: PutItemRequest<StatusDto>
): Promise<TweeterResponse> => {
  const statusService = new ServiceFactory().getStatusService();
  statusService.postStatus(request.token, Status.fromDto(request.item)!);

  return {
    success: true,
    message: null,
  };
};
