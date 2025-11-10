import { TweeterResponse } from "./TweeterResponse";

export interface GetFollowerAndFolloweeCountResponse extends TweeterResponse {
  readonly followerCount: number;
  readonly followeeCount: number;
}
