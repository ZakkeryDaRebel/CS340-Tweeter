import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Buffer } from "buffer";

export interface RegisterView {
  setIsLoading: (isLoading: boolean) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
  displayErrorMessage: (message: string) => void;
  navigate: (url: string) => void;
  setImageUrl: (url: string) => void;
  setImageFileExtension: (url: string) => void;
}

export class RegisterPresenter {
  private _view: RegisterView;
  private userService: UserService;
  private _imageBytes: Uint8Array;

  public constructor(view: RegisterView) {
    this._view = view;
    this.userService = new UserService();
    this._imageBytes = new Uint8Array();
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this._view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this._imageBytes = bytes;
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this._view.setImageFileExtension(fileExtension);
      }
    } else {
      this._view.setImageUrl("");
      this._imageBytes = new Uint8Array();
    }
  }

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }

  public async doRegister(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    rememberMe: boolean,
    imageFileExtension: string
  ) {
    try {
      this._view.setIsLoading(true);

      const [user, authToken] = await this.register(
        firstName,
        lastName,
        alias,
        password,
        imageFileExtension
      );

      this._view.updateUserInfo(user, user, authToken, rememberMe);
      this._view.navigate(`/feed/${user.alias}`);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    } finally {
      this._view.setIsLoading(false);
    }
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    return await this.userService.register(
      firstName,
      lastName,
      alias,
      password,
      this._imageBytes,
      imageFileExtension
    );
  }
}
