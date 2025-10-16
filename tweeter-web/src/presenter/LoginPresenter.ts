import { User } from "tweeter-shared";
import { SignInPresenter, SignInView } from "./SignInPresenter";

export class LoginPresenter extends SignInPresenter<SignInView> {
  private originalUrl: string | undefined;

  public constructor(view: SignInView, originalUrl: string | undefined) {
    super(view);
    this.originalUrl = originalUrl;
  }

  protected doSignInAction(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageFileExtension: string
  ) {
    return this.userService.login(alias, password);
  }

  protected navigateAction(user: User): void {
    if (!!this.originalUrl) {
      this.view.navigate(this.originalUrl);
    } else {
      this.view.navigate(`/feed/${user.alias}`);
    }
  }

  protected itemDescription(): string {
    return "log user";
  }
}
