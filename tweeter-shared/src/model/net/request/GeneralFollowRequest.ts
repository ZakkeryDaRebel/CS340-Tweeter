import { UserDto } from "../../dto/UserDto";

export interface GeneralFollowRequest {
  readonly token: string;
  readonly user: UserDto;
}
