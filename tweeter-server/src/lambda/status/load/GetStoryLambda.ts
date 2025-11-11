import { PagedItemRequest, PagedItemResponse, StatusDto } from "tweeter-shared";
import { handler as parentHandler } from "./LoadStatusesLambda";
import { StatusService } from "../../../model/service/StatusService";

export const handler = async (
  request: PagedItemRequest<StatusDto>
): Promise<PagedItemResponse<StatusDto>> => {
  const statusService = new StatusService();
  return parentHandler(request, statusService.loadMoreStoryItems);
};
