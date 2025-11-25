import {
  PagedItemRequest,
  PagedItemResponse,
  Status,
  StatusDto,
} from "tweeter-shared";
import { handler as parentHandler } from "./LoadStatusesLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: PagedItemRequest<StatusDto>
): Promise<PagedItemResponse<StatusDto>> => {
  const statusService = new ServiceFactory().getStatusService();
  return parentHandler(
    request,
    async (
      token: string,
      userAlias: string,
      pageSize: number,
      lastItem: Status | null
    ): Promise<[Status[], boolean]> => {
      return statusService.loadMoreFeedItems(
        token,
        userAlias,
        pageSize,
        lastItem
      );
    }
  );
};
