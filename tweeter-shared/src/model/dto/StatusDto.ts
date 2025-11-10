import { UserDto } from "./UserDto";

export interface StatusDto {
  readonly user: UserDto;
  readonly timestamp: number;
  readonly post: string;
}
