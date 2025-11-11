import { PagedItemRequest, PagedItemResponse, UserDto } from "tweeter-shared";

export const handler = async (
  request: PagedItemRequest<UserDto>,
  operation: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ) => Promise<[UserDto[], boolean]>
): Promise<PagedItemResponse<UserDto>> => {
  const [items, hasMore] = await operation(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem
  );

  return {
    success: true,
    message: null,
    items: items,
    hasMore: hasMore,
  };
};
