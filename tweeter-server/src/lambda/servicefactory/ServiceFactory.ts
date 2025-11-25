import { DynamoDBFactory } from "../../model/daofactory/DynamoDBFactory";
import { FollowService } from "../../model/service/FollowService";
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";

export class ServiceFactory {
  public getFollowService(): FollowService {
    return new FollowService(new DynamoDBFactory());
  }

  public getStatusService(): StatusService {
    return new StatusService(); // new DynamoDBFactory());
  }

  public getUserService(): UserService {
    return new UserService(); // new DynamoDBFactory());
  }
}
