import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";
import "isomorphic-fetch";

describe("Test Status Service's loadMoreStoryItems functionality using FakeData", () => {
  const service = new StatusService();
  const newAuth = new AuthToken("1234", Date.now());
  const userAlias = "@Allen";
  const pageSize = 5;
  let lastItem: Status | null = null;
  let fakeDataTenStatuses: Status[] = [];
  fillFakeDataStatuses();

  it("gets 5 story elements with null lastItem", async () => {
    let [items, hasMore] = await getStoryItems();
    expect(items.length).toBe(pageSize);
    expect(hasMore).toBe(true);
    for (let i = 0; i < items.length; i++) {
      compareItems(items.at(i)!, i);
    }
    lastItem = items.at(4)!;
  });
  it("gets 5 story elements with a valid lastItem and not have lastItem either", async () => {
    let [items, hasMore] = await getStoryItems();
    expect(items.length).toBe(5);
    expect(hasMore).toBe(true);
    for (let i = 0; i < items.length; i++) {
      compareItems(items.at(i)!, i + pageSize);
      expect(items.at(i)).not.toEqual(lastItem);
    }
  });

  function compareItems(item: Status, num: number) {
    expect(item).not.toBeNull();
    expect(item.post).toEqual(fakeDataTenStatuses.at(num)!.post);
    expect(item.user).toEqual(fakeDataTenStatuses.at(num)!.user);
  }

  async function getStoryItems(): Promise<[Status[], boolean]> {
    return await service.loadMoreStoryItems(
      newAuth,
      userAlias,
      pageSize,
      lastItem
    );
  }

  function fillFakeDataStatuses() {
    let firstStatus = new Status(
      "Post 0 0\n        My friend @amy likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Allen",
        "Anderson",
        "@allen",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
      ),
      0
    );
    let secondStatus = new Status(
      "Post 0 1\n        My friend @bob likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Amy",
        "Ames",
        "@amy",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
      ),
      0
    );
    let thirdStatus = new Status(
      "Post 0 2\n        My friend @bonnie likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Bob",
        "Bobson",
        "@bob",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
      ),
      0
    );
    let fourthStatus = new Status(
      "Post 0 3\n        My friend @chris likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Bonnie",
        "Beatty",
        "@bonnie",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
      ),
      0
    );
    let fifthStatus = new Status(
      "Post 0 4\n        My friend @cindy likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Chris",
        "Colston",
        "@chris",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
      ),
      0
    );
    let sixthStatus = new Status(
      "Post 0 5\n        My friend @dan likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Cindy",
        "Coats",
        "@cindy",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
      ),
      0
    );
    let seventhStatus = new Status(
      "Post 0 6\n        My friend @dee likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Dan",
        "Donaldson",
        "@dan",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
      ),
      0
    );
    let eighthStatus = new Status(
      "Post 0 7\n        My friend @elliott likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Dee",
        "Dempsey",
        "@dee",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
      ),
      0
    );
    let ninthStatus = new Status(
      "Post 0 8\n        My friend @elizabeth likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Elliott",
        "Enderson",
        "@elliott",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
      ),
      0
    );
    let tenthStatus = new Status(
      "Post 0 9\n        My friend @frank likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
      new User(
        "Elizabeth",
        "Engle",
        "@elizabeth",
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
      ),
      0
    );
    fakeDataTenStatuses.push(firstStatus);
    fakeDataTenStatuses.push(secondStatus);
    fakeDataTenStatuses.push(thirdStatus);
    fakeDataTenStatuses.push(fourthStatus);
    fakeDataTenStatuses.push(fifthStatus);
    fakeDataTenStatuses.push(sixthStatus);
    fakeDataTenStatuses.push(seventhStatus);
    fakeDataTenStatuses.push(eighthStatus);
    fakeDataTenStatuses.push(ninthStatus);
    fakeDataTenStatuses.push(tenthStatus);
  }
});
