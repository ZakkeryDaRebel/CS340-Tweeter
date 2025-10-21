import { AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavbarView extends MessageView {
  clearUserInfo: () => void;
  navigate: (url: string) => void;
}

export class AppNavbarPresenter extends Presenter<AppNavbarView> {
  private userService: UserService;

  public constructor(view: AppNavbarView) {
    super(view);
    this.userService = new UserService();
  }

  public get service() {
    return this.userService;
  }

  public async logOut(authToken: AuthToken | null) {
    await this.doFailureReportingOperation(async () => {
      const loggingOutToastId = this.view.displayInfoMessage(
        "Logging Out...",
        0
      );
      await this.service.logout(authToken!);

      this.view.deleteMessage(loggingOutToastId);
      this.view.clearUserInfo();
      this.view.navigate("/login");
    }, "log user out");
  }
}
