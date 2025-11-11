import { PagedItemRequest, PagedItemResponse, StatusDto } from "tweeter-shared";

export const handler = async (
  request: PagedItemRequest<StatusDto>,
  operation: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ) => Promise<[StatusDto[], boolean]>
): Promise<PagedItemResponse<StatusDto>> => {
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
