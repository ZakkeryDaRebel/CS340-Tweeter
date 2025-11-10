import { GeneralFollowRequest, GetCountResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { handler as parentHandler } from "./GetCountLambda";

export const handler = async (
  request: GeneralFollowRequest
): Promise<GetCountResponse> => {
  const followService = new FollowService();
  return parentHandler(request, followService.getFolloweeCount);
};
