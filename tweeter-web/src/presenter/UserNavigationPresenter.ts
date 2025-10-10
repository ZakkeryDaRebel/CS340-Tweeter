import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";

export interface UserNavigationView {
  navigate: (url: string) => void;
}

export class UserNavigationPresenter {
  private _view: UserNavigationView;
  private userService: UserService;

  public constructor(view: UserNavigationView) {
    this._view = view;
    this.userService = new UserService();
  }

  public async navigateToUser(
    event: React.MouseEvent,
    displayErrorMessage: (
      message: string,
      bootstrapClasses?: string | undefined
    ) => string,
    displayedUser: User | null,
    authToken: AuthToken | null,
    setDisplayedUser: (user: User) => void
  ): Promise<void> {
    //event.preventDefault();

    try {
      const featureURL = this.extractFeatureURL(event.target.toString());
      const alias = this.extractAlias(event.target.toString());

      const toUser = await this.userService.getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          this._view.navigate(`${featureURL}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  }

  extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  extractFeatureURL = (value: string): string => {
    const at_index = value.indexOf("@");
    const slash_index = value.lastIndexOf("/");
    if (at_index === -1) {
      return value.substring(slash_index);
    }
    const removedAlias = value.substring(0, at_index - 1);
    const next_slash = removedAlias.lastIndexOf("/");
    return removedAlias.substring(next_slash);
  };
}
