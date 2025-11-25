import { IsFollowerRequest, IsFollowerResponse, User } from "tweeter-shared";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: IsFollowerRequest
): Promise<IsFollowerResponse> => {
  const followService = new ServiceFactory().getFollowService();
  const isFollower = await followService.getIsFollowerStatus(
    request.token,
    User.fromDto(request.userOne)!,
    User.fromDto(request.userTwo)!
  );

  return {
    success: true,
    message: null,
    isFollower: isFollower,
  };
};
