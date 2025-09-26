import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { useMessageActions } from "../toaster/MessageHooks";

interface Props {
  title: String;
  icon: IconName;
}

const SocialMediaButton = (props: Props) => {
  const { displayInfoMessage } = useMessageActions();

  const displayInfoMessageWithDarkBackground = (message: string): void => {
    displayInfoMessage(
      message,
      3000,
      "text-white bg-primary"
    );
  };

  return (
    <button
      type="button"
      className="btn btn-link btn-floating mx-1"
      onClick={() =>
        displayInfoMessageWithDarkBackground(
          props.title + " registration is not implemented."
        )
      }
    >
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="{props.title}Tooltip">${props.title}</Tooltip>}
      >
        <FontAwesomeIcon icon={["fab", props.icon]} />
      </OverlayTrigger>
    </button>
  );
};

export default SocialMediaButton;
