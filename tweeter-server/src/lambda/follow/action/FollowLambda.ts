import {
  GetFollowerAndFolloweeCountResponse,
  PutItemRequest,
  User,
  UserDto,
} from "tweeter-shared";
import { handler as parentHandler } from "./FollowUnfollowLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: PutItemRequest<UserDto>
): Promise<GetFollowerAndFolloweeCountResponse> => {
  const followService = new ServiceFactory().getFollowService();
  return parentHandler(
    request,
    async (token: string, userToFollow: User): Promise<[number, number]> => {
      return followService.follow(token, userToFollow);
    }
  );
};
