import { TokenedRequest } from "./TokenedRequest";

export interface GetUserRequest extends TokenedRequest {
  readonly user: string;
}
