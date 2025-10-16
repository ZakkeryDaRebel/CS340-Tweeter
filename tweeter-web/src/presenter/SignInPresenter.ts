import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface SignInView extends View {
  setIsLoading: (isLoading: boolean) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
  navigate: (url: string) => void;
}

export abstract class SignInPresenter<
  V extends SignInView
> extends Presenter<V> {
  private _userService: UserService;

  protected constructor(view: V) {
    super(view);
    this._userService = new UserService();
  }

  protected get userService() {
    return this._userService;
  }

  public async doSignIn(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    rememberMe: boolean,
    imageFileExtension: string
  ) {
    await this.doFailureReportingAndFinallyOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.doSignInAction(
          firstName,
          lastName,
          alias,
          password,
          imageFileExtension
        );

        this.view.updateUserInfo(user, user, authToken, rememberMe);
        this.navigateAction(user);
      },
      this.itemDescription(),
      () => {
        this.view.setIsLoading(false);
      }
    );
  }

  protected abstract doSignInAction(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageFileExtension: string
  ): Promise<[User, AuthToken]>;

  protected abstract navigateAction(user: User): void;

  protected abstract itemDescription(): string;
}
