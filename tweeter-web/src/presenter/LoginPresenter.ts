import { SignInPresenter, SignInView } from "./SignInPresenter";

export class LoginPresenter extends SignInPresenter<SignInView> {
  public constructor(view: SignInView) {
    super(view);
  }

  public login(
    alias: string,
    password: string,
    originalUrl: string | undefined
  ) {
    return this.doSignIn("", "", alias, password, "", originalUrl);
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

  protected itemDescription(): string {
    return "log user";
  }
}
