import {
  AuthenticationRequest,
  AuthenticationResponse,
  User,
} from "tweeter-shared";
import { handler as parentHandler } from "./AuthenticationLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: AuthenticationRequest
): Promise<AuthenticationResponse> => {
  return parentHandler(async (): Promise<[User, string]> => {
    const userService = new ServiceFactory().getUserService();
    return await userService.login(request.alias, request.password);
  });
};
