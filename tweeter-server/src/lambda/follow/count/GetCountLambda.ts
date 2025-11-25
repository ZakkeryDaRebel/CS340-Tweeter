import {
  PutItemRequest,
  GetCountResponse,
  UserDto,
  User,
} from "tweeter-shared";

export const handler = async (
  request: PutItemRequest<UserDto>,
  operation: (token: string, user: User) => Promise<number>
): Promise<GetCountResponse> => {
  const count = await operation(request.token, User.fromDto(request.item)!);

  return {
    success: true,
    message: null,
    count: count,
  };
};
