import { TweeterRequest } from "./TweeterRequest";

export interface TokenedRequest extends TweeterRequest {
  readonly token: string;
}
