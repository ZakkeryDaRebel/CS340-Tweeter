import { TokenedRequest, TweeterResponse } from "tweeter-shared";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: TokenedRequest
): Promise<TweeterResponse> => {
  let userService = new ServiceFactory().getUserService();
  await userService.logout(request.token);

  return {
    success: true,
    message: null,
  };
};
