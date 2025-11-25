import { AuthenticationResponse, User, UserDto } from "tweeter-shared";

export const handler = async (
  operation: () => Promise<[User, string]>
): Promise<AuthenticationResponse> => {
  const [user, token] = await operation();

  return {
    success: true,
    message: null,
    user: user.dto,
    token: token,
  };
};
