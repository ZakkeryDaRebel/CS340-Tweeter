import {
  GetFollowerAndFolloweeCountResponse,
  PutItemRequest,
  UserDto,
} from "tweeter-shared";

export const handler = async (
  request: PutItemRequest<UserDto>,
  operation: (
    token: string,
    userToUnfollow: UserDto
  ) => Promise<[followerCount: number, followeeCount: number]>
): Promise<GetFollowerAndFolloweeCountResponse> => {
  const [followerCount, followeeCount] = await operation(
    request.token,
    request.item
  );

  return {
    success: true,
    message: null,
    followerCount: followerCount,
    followeeCount: followeeCount,
  };
};
