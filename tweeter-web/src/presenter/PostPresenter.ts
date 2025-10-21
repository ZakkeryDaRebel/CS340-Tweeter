import { AuthToken, Status, User } from "tweeter-shared";
import { MessageView, Presenter } from "./Presenter";
import { StatusService } from "../model.service/StatusService";

export interface PostView extends MessageView {
  setIsLoading: (isLoading: boolean) => void;
  setPost: (post: string) => void;
}

export class PostPresenter extends Presenter<PostView> {
  private statusService: StatusService;

  public constructor(view: PostView) {
    super(view);
    this.statusService = new StatusService();
  }

  public get service() {
    return this.statusService;
  }

  public async submitPost(
    post: string,
    currentUser: User,
    authToken: AuthToken
  ) {
    var postingStatusToastId = "";
    await this.doFailureReportingAndFinallyOperation(
      async () => {
        this.view.setIsLoading(true);
        postingStatusToastId = this.view.displayInfoMessage(
          "Posting status...",
          0
        );

        const status = new Status(post, currentUser!, Date.now());

        await this.service.postStatus(authToken!, status);

        this.view.setPost("");
        this.view.displayInfoMessage("Status posted!", 2000);
      },
      "post the status",
      () => {
        this.view.deleteMessage(postingStatusToastId);
        this.view.setIsLoading(false);
      }
    );
  }
}
