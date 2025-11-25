import { PagedItemRequest, PagedItemResponse, UserDto } from "tweeter-shared";
import { handler as parentHandler } from "./LoadArrayLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: PagedItemRequest<UserDto>
): Promise<PagedItemResponse<UserDto>> => {
  const followService = new ServiceFactory().getFollowService();
  return parentHandler(request, followService.loadMoreFollowers);
};
