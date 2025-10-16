import { AuthToken, Status, User } from "tweeter-shared";
import { PostService } from "../model.service/PostService";
import { MessageView, Presenter } from "./Presenter";

export interface PostView extends MessageView {
  setIsLoading: (isLoading: boolean) => void;
  setPost: (post: string) => void;
}

export class PostPresenter extends Presenter<PostView> {
  private postService: PostService;

  public constructor(view: PostView) {
    super(view);
    this.postService = new PostService();
  }

  public async submitPost(
    post: string,
    currentUser: User,
    authToken: AuthToken
  ) {
    var postingStatusToastId = "";
    await this.doFailureReportingOperation(async () => {
      this.view.setIsLoading(true);
      postingStatusToastId = this.view.displayInfoMessage(
        "Posting status...",
        0
      );

      const status = new Status(post, currentUser!, Date.now());

      await this.postService.postStatus(authToken!, status);

      this.view.setPost("");
      this.view.displayInfoMessage("Status posted!", 2000);
    }, "post the status");
    //finally?
    this.view.deleteMessage(postingStatusToastId);
    this.view.setIsLoading(false);
  }
}
