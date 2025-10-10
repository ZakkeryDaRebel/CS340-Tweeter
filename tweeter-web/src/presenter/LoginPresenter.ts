import { User, AuthToken, FakeData } from "tweeter-shared";
import { UserService } from "../model.service/UserService";

export interface LoginView {
  setIsLoading: (value: boolean) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
  navigate: (url: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter {
  private _view: LoginView;
  private originalUrl: string | undefined;
  private userService: UserService;

  public constructor(view: LoginView, originalUrl: string | undefined) {
    this._view = view;
    this.originalUrl = originalUrl;
    this.userService = new UserService();
  }

  public async doLogin(alias: string, password: string, rememberMe: boolean) {
    try {
      this._view.setIsLoading(true);

      const [user, authToken] = await this.userService.login(alias, password);

      this._view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!this.originalUrl) {
        this._view.navigate(this.originalUrl);
      } else {
        this._view.navigate(`/feed/${user.alias}`);
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    } finally {
      this._view.setIsLoading(false);
    }
  }
}
