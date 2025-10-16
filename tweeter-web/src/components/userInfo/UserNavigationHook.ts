import { useNavigate } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "./UserHooks";
import { useRef } from "react";
import {
  UserNavigationPresenter,
  UserNavigationView,
} from "../../presenter/UserNavigationPresenter";

export const useUserNavigation = () => {
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const navigate = useNavigate();

  const listener: UserNavigationView = {
    navigate: navigate,
    displayErrorMessage: displayErrorMessage,
  };

  const presenterRef = useRef<UserNavigationPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new UserNavigationPresenter(listener);
  }

  return {
    navigateToUser: (event: React.MouseEvent) =>
      navigateToUser(
        event,
        displayErrorMessage,
        displayedUser,
        authToken,
        setDisplayedUser,
        presenterRef.current!
      ),
  };
};

const navigateToUser = async (
  event: React.MouseEvent,
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined
  ) => string,
  displayedUser: User | null,
  authToken: AuthToken | null,
  setDisplayedUser: (user: User) => void,
  presenterRef: UserNavigationPresenter
): Promise<void> => {
  event.preventDefault();
  presenterRef.navigateToUser(
    event,
    displayedUser,
    authToken,
    setDisplayedUser
  );
};
