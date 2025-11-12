import {
  AuthToken,
  PagedItemRequest,
  PutItemRequest,
  RegisterRequest,
  User,
  UserDto,
} from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";
import "isomorphic-fetch";

describe("Test ServerFacade functionality using FakeData", () => {
  const serverFacade = new ServerFacade();
  const userAlias = "@allen";
  const password = "1234";
  const firstName = "Allen";
  const lastName = "Anderson";
  const pageSize = 5;

  let fakeDataUsers: User[] = [];
  instantiateFakeData();

  let token: string;

  it("registers a new user", async () => {
    const request: RegisterRequest = {
      alias: userAlias,
      password: password,
      firstName: firstName,
      lastName: lastName,
      imageStringBase64: "doesn't matter",
      imageFileExtension: "doesn't matter",
    };
    let [user, authToken] = await serverFacade.register(request);
    expect(user).not.toBeNull();
    expect(user.alias).toEqual(userAlias);
    expect(user.firstName).toEqual(firstName);
    expect(user.lastName).toEqual(lastName);
    expect(authToken).not.toBeNull();
    token = authToken.token;
  });

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
    for (let i = 0; i < items.length; i++) {
      expect(items.at(i)).not.toBeNull();
      expect(items.at(i)).toEqual(fakeDataUsers.at(i));
    }
  });

  it("gets the count of people following the user", async () => {
    const request: PutItemRequest<UserDto> = {
      token,
      item: {
        firstName: firstName,
        lastName: lastName,
        alias: userAlias,
        imageUrl: "",
      },
    };
    let count = await serverFacade.getFolloweeCount(request);
    expect(count).not.toBeNull();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  function instantiateFakeData() {
    let firstUser = new User(
      "Amy",
      "Ames",
      "@amy",
      "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
    );
    let secondUser = new User(
      "Bob",
      "Bobson",
      "@bob",
      "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
    );
    let thirdUser = new User(
      "Bonnie",
      "Beatty",
      "@bonnie",
      "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
    );
    let fourthUser = new User(
      "Chris",
      "Colston",
      "@chris",
      "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
    );
    let fifthUser = new User(
      "Cindy",
      "Coats",
      "@cindy",
      "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/daisy_duck.png"
    );
    fakeDataUsers.push(firstUser);
    fakeDataUsers.push(secondUser);
    fakeDataUsers.push(thirdUser);
    fakeDataUsers.push(fourthUser);
    fakeDataUsers.push(fifthUser);
  }
});
