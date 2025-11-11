import { GetCountResponse, PutItemRequest, UserDto } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { handler as parentHandler } from "./GetCountLambda";

export const handler = async (
  request: PutItemRequest<UserDto>
): Promise<GetCountResponse> => {
  const followService = new FollowService();
  return parentHandler(request, followService.getFolloweeCount);
};
