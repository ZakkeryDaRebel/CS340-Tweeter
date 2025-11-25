import { FollowDAO } from "../dao/follow/FollowDAO";
import { FollowDynamoDB } from "../dao/follow/FollowDynamoDB";
import { DAOFactory } from "./DAOFactory";

export class DynamoDBFactory implements DAOFactory {
  getFollowDAO(): FollowDAO {
    return new FollowDynamoDB();
  }
}
