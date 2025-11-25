import { Status, FakeData } from "tweeter-shared";
import { Service } from "./Service";

export class StatusService implements Service {
  public constructor() {}

  // TODO: Have non-DTO & DTO translation happen in the handler

  // Helper Methods
  private async getStatuses(
    lastItem: Status | null,
    pageSize: number
  ): Promise<[Status[], boolean]> {
    let [statuses, hasMore] = FakeData.instance.getPageOfStatuses(
      lastItem,
      pageSize
    );
    return [statuses, hasMore];
  }

  // Endpoint 8
  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return await this.getStatuses(lastItem, pageSize);
  }

  // Endpoint 9
  public async loadMoreStoryItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return await this.getStatuses(lastItem, pageSize);
  }

  // Endpoint 10
  public async postStatus(token: string, newStatus: Status): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
  }
}
