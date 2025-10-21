import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../src/presenter/LoginPresenter";
import { instance, mock, verify } from "@typestrong/ts-mockito";

library.add(fab);

describe("Login Component", () => {
  it("starts with the sign in button disabled", () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables sign in button if both alias and password fields have text", async () => {
    await fillBothFields("/");
  });

  it("disables the sign in button if either the alias or the password field is cleared", async () => {
    const { user, signInButton, aliasField, passwordField } =
      await fillBothFields("/");

    await user.clear(aliasField);
    expect(signInButton).toBeDisabled();

    await user.type(aliasField, "c");
    expect(signInButton).toBeEnabled();

    await user.clear(passwordField);
    expect(signInButton).toBeDisabled();
  });

  it("calls the presenter's login method with correct parameters when the sign in button is pressed", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const originalUrl = "http://somwhere.com";
    const alias = "@alias";
    const password = "myPassword";

    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements(originalUrl, mockPresenterInstance);

    await user.type(aliasField, alias);
    await user.type(passwordField, password);
    await user.click(signInButton);

    verify(mockPresenter.login(alias, password, originalUrl)).once();
  });
});

function renderLogin(originalUrl: string, presenter?: LoginPresenter) {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <Login originalUrl={originalUrl} presenter={presenter} />
      ) : (
        <Login originalUrl={originalUrl} />
      )}
    </MemoryRouter>
  );
}

function renderLoginAndGetElements(
  originalUrl: string,
  presenter?: LoginPresenter
) {
  const user = userEvent.setup();

  renderLogin(originalUrl, presenter);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");
  return { user, signInButton, aliasField, passwordField };
}

async function fillBothFields(originalUrl: string, presenter?: LoginPresenter) {
  const { signInButton, aliasField, passwordField, user } =
    renderLoginAndGetElements(originalUrl, presenter);

  await user.type(aliasField, "a");
  await user.type(passwordField, "b");
  expect(signInButton).toBeEnabled();

  return { user, signInButton, aliasField, passwordField };
}
