import { AuthenticationResponse, RegisterRequest, User } from "tweeter-shared";
import { handler as parentHandler } from "./AuthenticationLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: RegisterRequest
): Promise<AuthenticationResponse> => {
  return parentHandler(async (): Promise<[User, string]> => {
    const userService = new ServiceFactory().getUserService();
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
