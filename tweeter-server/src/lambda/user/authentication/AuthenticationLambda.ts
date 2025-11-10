import { AuthenticationResponse, UserDto } from "tweeter-shared";

export const handler = async (
  operation: () => Promise<[UserDto, string]>
): Promise<AuthenticationResponse> => {
  const [user, token] = await operation();

  return {
    success: true,
    message: null,
    user: user,
    token: token,
  };
};
