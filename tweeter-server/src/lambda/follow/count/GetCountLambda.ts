import { PutItemRequest, GetCountResponse, UserDto } from "tweeter-shared";

export const handler = async (
  request: PutItemRequest<UserDto>,
  operation: (token: string, user: UserDto) => Promise<number>
): Promise<GetCountResponse> => {
  const count = await operation(request.token, request.item);

  return {
    success: true,
    message: null,
    count: count,
  };
};
