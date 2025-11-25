import { PagedItemRequest, PagedItemResponse, StatusDto } from "tweeter-shared";
import { handler as parentHandler } from "./LoadStatusesLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: PagedItemRequest<StatusDto>
): Promise<PagedItemResponse<StatusDto>> => {
  const statusService = new ServiceFactory().getStatusService();
  return parentHandler(request, statusService.loadMoreStoryItems);
};
