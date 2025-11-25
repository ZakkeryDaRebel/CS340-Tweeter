import {
  PagedItemRequest,
  PagedItemResponse,
  Status,
  StatusDto,
} from "tweeter-shared";

export const handler = async (
  request: PagedItemRequest<StatusDto>,
  operation: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ) => Promise<[Status[], boolean]>
): Promise<PagedItemResponse<StatusDto>> => {
  const [items, hasMore] = await operation(
    request.token,
    request.userAlias,
    request.pageSize,
    Status.fromDto(request.lastItem)
  );

  const dtos = items.map((status: Status) => status.dto);

  return {
    success: true,
    message: null,
    items: dtos,
    hasMore: hasMore,
  };
};
