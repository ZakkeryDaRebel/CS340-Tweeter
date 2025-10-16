import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/FollowService";
import { MessageView, Presenter } from "./Presenter";

export interface UserInfoView extends MessageView {
  setIsFollower: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setFolloweeCount: (value: number) => void;
  setFollowerCount: (value: number) => void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
  private followService: FollowService;

  public constructor(view: UserInfoView) {
    super(view);
    this.followService = new FollowService();
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    await this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.followService.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!
          )
        );
      }
    }, "determine follower status");
  }

  public async setNumb(
    authToken: AuthToken,
    displayedUser: User,
    setCount: (value: number) => void,
    getCount: (authToken: AuthToken, displayedUser: User) => Promise<number>,
    itemDescription: string
  ) {
    await this.doFailureReportingOperation(async () => {
      setCount(await getCount(authToken, displayedUser));
    }, itemDescription);
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    this.setNumb(
      authToken,
      displayedUser,
      this.view.setFolloweeCount,
      this.followService.getFolloweeCount,
      "get followees count"
    );
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    this.setNumb(
      authToken,
      displayedUser,
      this.view.setFollowerCount,
      this.followService.getFollowerCount,
      "get followers count"
    );
  }

  public async followFeature(
    authToken: AuthToken,
    displayedUser: User,
    setFollower: boolean,
    toastDescription: string,
    itemDescription: string,
    followMethod: (
      authToken: AuthToken,
      userToFollow: User
    ) => Promise<[number, number]>
  ) {
    var followUserToast = "";
    await this.doFailureReportingAndFinallyOperation(
      async () => {
        this.view.setIsLoading(true);
        followUserToast = this.view.displayInfoMessage(
          `${toastDescription} ${displayedUser!.name}...`,
          0
        );
        console.log("Before followMethod");
        const [followerCount, followeeCount] = await followMethod(
          authToken,
          displayedUser
        );
        console.log("After FollowMethod");
        this.view.setIsFollower(setFollower);
        this.view.setFollowerCount(followerCount);
        this.view.setFolloweeCount(followeeCount);
      },
      itemDescription,
      () => {
        this.view.deleteMessage(followUserToast);
        this.view.setIsLoading(false);
      }
    );
  }

  public async followDisplayedUser(
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    this.followFeature(
      authToken!,
      displayedUser!,
      true,
      "Following",
      "follow user",
      () => {
        return this.followService.follow(authToken!, displayedUser!);
      }
    );
  }

  public async unfollowDisplayedUser(
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    this.followFeature(
      authToken!,
      displayedUser!,
      false,
      "Unfollowing",
      "unfollow user",
      () => {
        return this.followService.unfollow(authToken!, displayedUser!);
      }
    );
  }
}
