import { TokenedRequest } from "./TokenedRequest";

export interface PagedItemRequest<T> extends TokenedRequest {
  readonly userAlias: string;
  readonly pageSize: number;
  readonly lastItem: T | null;
}
