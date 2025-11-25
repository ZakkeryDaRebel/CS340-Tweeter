import { GetUserRequest, GetUserResponse } from "tweeter-shared";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: GetUserRequest
): Promise<GetUserResponse> => {
  const userService = new ServiceFactory().getUserService();
  const user = await userService.getUser(request.token, request.user);

  return {
    success: true,
    message: null,
    user: user === null ? null : user.dto,
  };
};
