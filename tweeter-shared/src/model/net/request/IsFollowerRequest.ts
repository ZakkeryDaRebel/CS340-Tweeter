import { UserDto } from "../../dto/UserDto";

export interface IsFollowerRequest {
  readonly token: string;
  readonly userOne: UserDto;
  readonly userTwo: UserDto;
}
