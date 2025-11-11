import {
  AuthenticationRequest,
  AuthenticationResponse,
  UserDto,
} from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { handler as parentHandler } from "./AuthenticationLambda";

export const handler = async (
  request: AuthenticationRequest
): Promise<AuthenticationResponse> => {
  return parentHandler(async (): Promise<[UserDto, string]> => {
    const userService = new UserService();
    return await userService.login(request.alias, request.password);
  });
};
