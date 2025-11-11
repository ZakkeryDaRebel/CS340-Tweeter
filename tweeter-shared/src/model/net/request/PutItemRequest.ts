import { TokenedRequest } from "./TokenedRequest";

export interface PutItemRequest<T> extends TokenedRequest {
  readonly item: T;
}
