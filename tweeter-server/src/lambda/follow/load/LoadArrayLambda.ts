import {
  PagedItemRequest,
  PagedItemResponse,
  User,
  UserDto,
} from "tweeter-shared";

export const handler = async (
  request: PagedItemRequest<UserDto>,
  operation: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ) => Promise<[User[], boolean]>
): Promise<PagedItemResponse<UserDto>> => {
  const [items, hasMore] = await operation(
    request.token,
    request.userAlias,
    request.pageSize,
    User.fromDto(request.lastItem)
  );

  const dtos = items.map((user: User) => user.dto);

  return {
    success: true,
    message: null,
    items: dtos,
    hasMore: hasMore,
  };
};
