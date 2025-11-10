import {
  GeneralFollowRequest,
  GetFollowerAndFolloweeCountResponse,
} from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { handler as parentHandler } from "./FollowUnfollowLambda";

export const handler = async (
  request: GeneralFollowRequest
): Promise<GetFollowerAndFolloweeCountResponse> => {
  const followService = new FollowService();
  return parentHandler(request, followService.follow);
};
