import {
  AuthenticationResponse,
  RegisterRequest,
  UserDto,
} from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { handler as parentHandler } from "./AuthenticationLambda";

export const handler = async (
  request: RegisterRequest
): Promise<AuthenticationResponse> => {
  return parentHandler(async (): Promise<[UserDto, string]> => {
    const userService = new UserService();
    return await userService.register(
      request.firstName,
      request.lastName,
      request.alias,
      request.password,
      request.imageStringBase64,
      request.imageFileExtension
    );
  });
};
