import { PagedItemRequest, UserDto } from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";
import "isomorphic-fetch";

describe("Test ServerFacade functionality using FakeData", () => {
  const serverFacade = new ServerFacade();
  const token = "1234";
  const userAlias = "@Allen";
  const pageSize = 5;

  it("registers a new user", () => {});

  it("gets a list of followers", async () => {
    const request: PagedItemRequest<UserDto> = {
      token: token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: null,
    };
    let [items, hasMore] = await serverFacade.getMoreFollowers(request);
    expect(items.length).toBe(pageSize);
    expect(hasMore).toBe(true);
    items.forEach((user) => {
      expect(user).not.toBeNull();
    });
    console.log("Server Facade 1st Follower: " + items.at(1)?.alias);
  });

  it("gets the count of people following the user", () => {});

  it("gets the count of people the user is following", () => {});
});
