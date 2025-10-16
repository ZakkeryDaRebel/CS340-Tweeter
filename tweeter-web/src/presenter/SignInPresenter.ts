import { UserService } from "../model.service/UserService";
import { View } from "./Presenter";

export interface SignInView extends View {}

export abstract class SignInPresenter {
  private view: SignInView;
  private _userService: UserService;

  protected constructor(view: SignInView) {
    this.view = view;
    this._userService = new UserService();
  }

  protected get userService() {
    return this._userService;
  }
}
