import { TokenedRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const handler = async (
  request: TokenedRequest
): Promise<TweeterResponse> => {
  let userService = new UserService();
  await userService.logout(request.token);

  return {
    success: true,
    message: null,
  };
};
