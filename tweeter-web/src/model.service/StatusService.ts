import {
  AuthToken,
  Status,
  FakeData,
  PagedItemRequest,
  StatusDto,
  PutItemRequest,
} from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../network/ServerFacade";

export class StatusService implements Service {
  // Endpoint 8
  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const request: PagedItemRequest<StatusDto> = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return new ServerFacade().loadMoreFeedItems(request);
  }

  // Endpoint 9
  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const request: PagedItemRequest<StatusDto> = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return new ServerFacade().loadMoreStoryItems(request);
  }

  // Endpoint 10
  public async postStatus(
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    const request: PutItemRequest<StatusDto> = {
      token: authToken.token,
      item: newStatus.dto,
    };
    return new ServerFacade().postStatus(request);
  }
}
