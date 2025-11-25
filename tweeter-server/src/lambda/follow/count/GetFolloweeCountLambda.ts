import {
  GetCountResponse,
  PutItemRequest,
  User,
  UserDto,
} from "tweeter-shared";
import { handler as parentHandler } from "./GetCountLambda";
import { ServiceFactory } from "../../servicefactory/ServiceFactory";

export const handler = async (
  request: PutItemRequest<UserDto>
): Promise<GetCountResponse> => {
  const followService = new ServiceFactory().getFollowService();
  return parentHandler(
    request,
    async (token: string, user: User): Promise<number> => {
      return followService.getFolloweeCount(token, user);
    }
  );
};
