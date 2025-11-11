import { UserDto } from "../../dto/UserDto";
import { TokenedRequest } from "./TokenedRequest";

export interface IsFollowerRequest extends TokenedRequest {
  readonly userOne: UserDto;
  readonly userTwo: UserDto;
}
