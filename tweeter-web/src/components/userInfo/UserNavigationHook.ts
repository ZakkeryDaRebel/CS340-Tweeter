import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "./UserHooks";

export const useUserNavigation = () => {
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const navigate = useNavigate();

  // const listener: UserNavigationView = {
  //   navigate: navigate,
  // };

  // const presenterRef = useRef<UserNavigationPresenter | null>(null);
  // if (!presenterRef.current) {
  //   presenterRef.current = new UserNavigationPresenter(listener);
  // }

  return {
    navigateToUser: (event: React.MouseEvent) =>
      navigateToUser(
        event,
        displayErrorMessage,
        displayedUser,
        authToken,
        setDisplayedUser,
        navigate
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
  navigate: NavigateFunction
): Promise<void> => {
  event.preventDefault();
  // presenterRef.current!.navigateToUser(
  //   displayErrorMessage,
  //   displayedUser,
  //   authToken,
  //   setDisplayedUser
  // );
  try {
    const featureURL = extractFeatureURL(event.target.toString());
    const alias = extractAlias(event.target.toString());

    const toUser = await getUser(authToken!, alias);

    if (toUser) {
      if (!toUser.equals(displayedUser!)) {
        setDisplayedUser(toUser);
        navigate(`${featureURL}/${toUser.alias}`);
      }
    }
  } catch (error) {
    displayErrorMessage(`Failed to get user because of exception: ${error}`);
  }
};

const extractAlias = (value: string): string => {
  const index = value.indexOf("@");
  return value.substring(index);
};

const extractFeatureURL = (value: string): string => {
  const at_index = value.indexOf("@");
  const slash_index = value.lastIndexOf("/");
  if (at_index === -1) {
    return value.substring(slash_index);
  }
  const removedAlias = value.substring(0, at_index - 1);
  const next_slash = removedAlias.lastIndexOf("/");
  return removedAlias.substring(next_slash);
};

const getUser = async (
  authToken: AuthToken,
  alias: string
): Promise<User | null> => {
  // TODO: Replace with the result of calling server
  return FakeData.instance.findUserByAlias(alias);
};
