import {
  GeneralFollowRequest,
  GetCountResponse,
  UserDto,
} from "tweeter-shared";

export const handler = async (
  request: GeneralFollowRequest,
  operation: (token: string, user: UserDto) => Promise<number>
): Promise<GetCountResponse> => {
  const count = await operation(request.token, request.user);

  return {
    success: true,
    message: null,
    count: count,
  };
};
