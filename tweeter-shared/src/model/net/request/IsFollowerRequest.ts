import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface IsFollowerRequest extends TweeterRequest {
  readonly token: string;
  readonly userOne: UserDto;
  readonly userTwo: UserDto;
}
