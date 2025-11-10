import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface AuthenticationResponse extends TweeterResponse {
  readonly token: string;
  readonly user: UserDto;
}
