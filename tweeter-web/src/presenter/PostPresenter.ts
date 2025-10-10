import { AuthToken, Status, User } from "tweeter-shared";
import { PostService } from "../model.service/PostService";

export interface PostView {
  setIsLoading: (isLoading: boolean) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined
  ) => string;
  setPost: (post: string) => void;
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined
  ) => string;
  deleteMessage: (messageId: string) => void;
}

export class PostPresenter {
  private _view: PostView;
  private postService: PostService;

  public constructor(view: PostView) {
    this._view = view;
    this.postService = new PostService();
  }

  public async submitPost(
    post: string,
    currentUser: User,
    authToken: AuthToken
  ) {
    var postingStatusToastId = "";

    try {
      this._view.setIsLoading(true);
      postingStatusToastId = this._view.displayInfoMessage(
        "Posting status...",
        0
      );

      const status = new Status(post, currentUser!, Date.now());

      await this.postService.postStatus(authToken!, status);

      this._view.setPost("");
      this._view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`
      );
    } finally {
      this._view.deleteMessage(postingStatusToastId);
      this._view.setIsLoading(false);
    }
  }
}
