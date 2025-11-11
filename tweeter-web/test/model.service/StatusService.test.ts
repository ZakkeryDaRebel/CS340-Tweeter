import { AuthToken, Status } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";

describe("Test Status Service's loadMoreStoryItems functionality using FakeData", () => {
  const service = new StatusService();
  const newAuth = new AuthToken("1234", Date.now());
  const userAlias = "@Allen";
  const pageSize = 5;
  let lastItem: Status | null = null;

  it("gets 5 story elements with null lastItem", async () => {
    let [items, hasMore] = await getStoryItems();
    expect(items.length).toBe(5);
    expect(hasMore).toBe(true);
    expect(items.at(4)).not.toBeNull();
    lastItem = items.at(4)!;
    expect(lastItem.post).not.toBeNull();
    expect(lastItem.user).not.toBeNull();
  });
  it("gets 5 story elements with a valid lastItem and not have lastItem either", async () => {
    let [items, hasMore] = await getStoryItems();
    expect(items.length).toBe(5);
    items.forEach((status) => {
      expect(status).not.toEqual(lastItem);
    });
  });

  async function getStoryItems(): Promise<[Status[], boolean]> {
    return await service.loadMoreStoryItems(
      newAuth,
      userAlias,
      pageSize,
      lastItem
    );
  }
});
