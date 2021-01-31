import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isExternalUrl } from "../utils";

export const Link = (props: { href: string; className?: string; children: React.ReactNode }) => {
  const className =
    "text-primary-700 border-primary-300 border-b-2 hover:text-primary-400 transition-colors duration-200 ease-in-out";

  if (isExternalUrl(props.href)) {
    return (
      <a href={props.href} className={`${className} ${props.className}`}>
        {props.children}&nbsp;
        <FontAwesomeIcon style={{ marginBottom: "0.15em" }} icon={faExternalLinkAlt} size="xs" />
      </a>
    );
  } else {
    return (
      <a className={className} href={props.href}>
        {props.children}
      </a>
    );
  }
};
