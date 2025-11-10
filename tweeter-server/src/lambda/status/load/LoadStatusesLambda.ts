import {
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  StatusDto,
} from "tweeter-shared";

export const handler = async (
  request: PagedStatusItemRequest,
  operation: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ) => Promise<[StatusDto[], boolean]>
): Promise<PagedStatusItemResponse> => {
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
