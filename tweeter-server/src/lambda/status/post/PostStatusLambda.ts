import { PutItemRequest, StatusDto, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";

export const handler = async (
  request: PutItemRequest<StatusDto>
): Promise<TweeterResponse> => {
  const statusService = new StatusService();
  statusService.postStatus(request.token, request.item);

  return {
    success: true,
    message: null,
  };
};
