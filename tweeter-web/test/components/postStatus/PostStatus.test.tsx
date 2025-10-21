import { render, screen } from "@testing-library/react";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { PostPresenter } from "../../../src/presenter/PostPresenter";
import { useUserInfo } from "../../../src/components/userInfo/UserHooks";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken, User } from "tweeter-shared";

jest.mock("../../../src/components/userInfo/UserHooks", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserHooks"),
  __esModule: true,
  useUserInfo: jest.fn(),
}));

const mockAuthTokenInstance = new AuthToken("abc123", Date.now());
const mockUserInstance = new User("a", "a", "a", "a");
const newPost = "Here is a new Post to Share with the world";

describe("PostStatus Component", () => {
  beforeEach(() => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
  });

  it("starts with both buttons disabled", () => {
    const { submitButton, clearButton } = renderPostAndGetElements();
    expect(submitButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("both buttons are enabled when the text field has text", async () => {
    await fillTextBox();
  });

  it("both buttons are disabled when the text field is cleared", async () => {
    const { user, textBox, submitButton, clearButton } = await fillTextBox();
    await user.click(clearButton);

    expect(textBox).toBeEmptyDOMElement();
    expect(submitButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("calls the presenter's postStatus method with correct parameters when the Post Status button is pressed", async () => {
    const mockPresenter = mock<PostPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const { user, submitButton } = await fillTextBox(mockPresenterInstance);
    await user.click(submitButton);

    verify(
      mockPresenter.submitPost(newPost, mockUserInstance, mockAuthTokenInstance)
    ).once();
  });
});

function renderPost(presenter?: PostPresenter) {
  return render(
    <>{!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}</>
  );
}

function renderPostAndGetElements(presenter?: PostPresenter) {
  const user = userEvent.setup();

  renderPost(presenter);

  const textBox = screen.getByLabelText("postTextBox");
  const submitButton = screen.getByRole("button", { name: /Post Status/i });
  const clearButton = screen.getByRole("button", { name: /Clear/i });
  return { user, textBox, submitButton, clearButton };
}

async function fillTextBox(presenter?: PostPresenter) {
  const { user, textBox, submitButton, clearButton } =
    renderPostAndGetElements(presenter);

  await user.type(textBox, newPost);
  expect(submitButton).toBeEnabled();
  expect(clearButton).toBeEnabled();

  return { user, textBox, submitButton, clearButton };
}
