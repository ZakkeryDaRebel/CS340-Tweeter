import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface GeneralFollowRequest extends TweeterRequest {
  readonly token: string;
  readonly user: UserDto;
}
