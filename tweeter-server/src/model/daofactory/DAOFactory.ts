import { FollowDAO } from "../dao/follow/FollowDAO";

export interface DAOFactory {
  getFollowDAO(): FollowDAO;
}
