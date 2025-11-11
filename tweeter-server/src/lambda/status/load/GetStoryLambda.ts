import {
  PagedStatusItemRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { handler as parentHandler } from "./LoadStatusesLambda";
import { StatusService } from "../../../model/service/StatusService";

export const handler = async (
  request: PagedStatusItemRequest
): Promise<PagedStatusItemResponse> => {
  const statusService = new StatusService();
  return parentHandler(request, statusService.loadMoreStoryItems);
};
