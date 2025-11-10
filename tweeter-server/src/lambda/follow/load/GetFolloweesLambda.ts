import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { handler as parentHandler } from "./LoadArrayLambda";

export const handler = async (
  request: PagedUserItemRequest
): Promise<PagedUserItemResponse> => {
  const followService = new FollowService();
  return parentHandler(request, followService.loadMoreFollowees);
};
