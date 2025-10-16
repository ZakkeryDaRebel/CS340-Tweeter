import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Buffer } from "buffer";
import { Presenter } from "./Presenter";
import { SignInPresenter, SignInView } from "./SignInPresenter";

export interface RegisterView extends SignInView {
  setImageUrl: (url: string) => void;
  setImageFileExtension: (url: string) => void;
}

export class RegisterPresenter extends SignInPresenter<RegisterView> {
  private _imageBytes: Uint8Array;

  public constructor(view: RegisterView) {
    super(view);
    this._imageBytes = new Uint8Array();
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this.view.setImageUrl(URL.createObjectURL(file));

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
        this.view.setImageFileExtension(fileExtension);
      }
    } else {
      this.view.setImageUrl("");
      this._imageBytes = new Uint8Array();
    }
  }

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }

  protected doSignInAction(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageFileExtension: string
  ) {
    return this.userService.register(
      firstName,
      lastName,
      alias,
      password,
      this._imageBytes,
      imageFileExtension
    );
  }

  protected navigateAction(user: User): void {
    this.view.navigate(`/feed/${user.alias}`);
  }

  protected itemDescription(): string {
    return "register user";
  }
}
