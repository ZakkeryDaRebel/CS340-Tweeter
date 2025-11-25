import { GetCountResponse, PutItemRequest, UserDto } from "tweeter-shared";
import { handler as parentHandler } from "./GetCountLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: PutItemRequest<UserDto>
): Promise<GetCountResponse> => {
  const followService = new ServiceFactory().getFollowService();
  return parentHandler(request, followService.getFolloweeCount);
};
