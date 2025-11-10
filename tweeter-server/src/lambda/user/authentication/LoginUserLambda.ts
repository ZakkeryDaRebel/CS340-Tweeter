import { AuthenticationResponse, LoginRequest, UserDto } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { handler as parentHandler } from "./AuthenticationLambda";

export const handler = async (
  request: LoginRequest
): Promise<AuthenticationResponse> => {
  return parentHandler(async (): Promise<[UserDto, string]> => {
    const userService = new UserService();
    return await userService.login(request.alias, request.password);
  });
};
