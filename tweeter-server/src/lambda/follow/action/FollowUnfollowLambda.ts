import {
  GeneralFollowRequest,
  GetFollowerAndFolloweeCountResponse,
  UserDto,
} from "tweeter-shared";

export const handler = async (
  request: GeneralFollowRequest,
  operation: (
    token: string,
    userToUnfollow: UserDto
  ) => Promise<[followerCount: number, followeeCount: number]>
): Promise<GetFollowerAndFolloweeCountResponse> => {
  const [followerCount, followeeCount] = await operation(
    request.token,
    request.user
  );

  return {
    success: true,
    message: null,
    followerCount: followerCount,
    followeeCount: followeeCount,
  };
};
