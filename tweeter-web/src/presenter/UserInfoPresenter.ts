import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/FollowService";

export interface UserInfoView {
  setIsFollower: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined
  ) => string;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined
  ) => string;
  deleteMessage: (messageId: string) => void;
  setFolloweeCount: (value: number) => void;
  setFollowerCount: (value: number) => void;
}

export class UserInfoPresenter {
  private _view: UserInfoView;
  private followService: FollowService;
  private isFollower: boolean;
  private followeeCount: number;
  private followerCount: number;
  private isLoading: boolean;

  public constructor(view: UserInfoView) {
    this._view = view;
    this.followService = new FollowService();
    this.isFollower = false;
    this.followeeCount = -1;
    this.followerCount = -1;
    this.isLoading = false;
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    try {
      if (currentUser === displayedUser) {
        this.isFollower = false;
      } else {
        this.isFollower = await this.followService.getIsFollowerStatus(
          authToken!,
          currentUser!,
          displayedUser!
        );
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`
      );
    }
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    try {
      this.followeeCount = await this.followService.getFolloweeCount(
        authToken,
        displayedUser
      );
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get followees count because of exception: ${error}`
      );
    }
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    try {
      this.followerCount = await this.followService.getFollowerCount(
        authToken,
        displayedUser
      );
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get followers count because of exception: ${error}`
      );
    }
  }

  public async followDisplayedUser(
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    var followingUserToast = "";

    try {
      this.isLoading = true;
      followingUserToast = this._view.displayInfoMessage(
        `Following ${displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.followService.follow(
        authToken!,
        displayedUser!
      );

      this.isFollower = true;
      this.followerCount = followerCount;
      this.followeeCount = followeeCount;
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`
      );
    } finally {
      this._view.deleteMessage(followingUserToast);
      this.isLoading = false;
    }
  }

  public async unfollowDisplayedUser(
    authToken: AuthToken | null,
    displayedUser: User | null
  ): Promise<void> {
    var unfollowingUserToast = "";

    try {
      this.isLoading = true;
      unfollowingUserToast = this._view.displayInfoMessage(
        `Unfollowing ${displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.followService.unfollow(
        authToken!,
        displayedUser!
      );

      this.isFollower = false;
      this.followerCount = followerCount;
      this.followeeCount = followeeCount;
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`
      );
    } finally {
      this._view.deleteMessage(unfollowingUserToast);
      this.isLoading = false;
    }
  }
}
