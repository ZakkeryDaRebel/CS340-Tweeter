import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model.service/StatusService";
import { PostPresenter, PostView } from "../../src/presenter/PostPresenter";
import { AuthToken, User } from "tweeter-shared";

describe("PostStatusPresenter", () => {
  let mockPostView: PostView;
  let postPresenter: PostPresenter;
  let mockService: StatusService;

  const authToken = new AuthToken("abc123", Date.now());
  const testUser = new User("a", "a", "a", "a");
  const newPostMessage = "New Post";

  beforeEach(() => {
    mockPostView = mock<PostView>();
    const mockPostViewInstance = instance(mockPostView);
    when(mockPostView.displayInfoMessage(anything(), 0)).thenReturn(
      "messageId123"
    );

    const postPresenterSpy = spy(new PostPresenter(mockPostViewInstance));
    postPresenter = instance(postPresenterSpy);

    mockService = mock<StatusService>();
    when(postPresenterSpy.service).thenReturn(instance(mockService));
  });

  it("tells the view to display a posting status message", async () => {
    await postPresenter.submitPost(newPostMessage, testUser, authToken);
    verify(mockPostView.displayInfoMessage("Posting status...", 0)).once();
  });

  it("calls postStatus on the post status service with the correct status string and auth token", async () => {
    await postPresenter.submitPost(newPostMessage, testUser, authToken);
    let [capturedAuth, capturedStatus] = capture(mockService.postStatus).last();
    expect(capturedAuth).toEqual(authToken);
    expect(capturedStatus).not.toBeNull();
    expect(capturedStatus.post).toEqual(newPostMessage);
    expect(capturedStatus.user).toEqual(testUser);
  });

  it("tells the view to clear the info message that was displayed previously, clears the post, and displays a status posted message", async () => {
    await postPresenter.submitPost(newPostMessage, testUser, authToken);
    verify(mockPostView.deleteMessage("messageId123")).once();
    verify(mockPostView.setPost("")).once();
    verify(mockPostView.displayInfoMessage("Status posted!", 2000)).once();

    verify(mockPostView.displayErrorMessage(anything())).never();
  });

  it("tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message when unsuccessfull", async () => {
    let error = new Error("An error occurred");
    when(mockService.postStatus(anything(), anything())).thenThrow(error);

    await postPresenter.submitPost(newPostMessage, testUser, authToken);
    verify(mockPostView.deleteMessage("messageId123")).once();
    verify(
      mockPostView.displayErrorMessage(
        "Failed to post the status because of exception: An error occurred"
      )
    ).once();
    verify(mockPostView.deleteMessage(anything())).once();
    verify(mockPostView.setPost("")).never();
    verify(mockPostView.displayInfoMessage("Status posted!", 2000)).never();
  });
});
