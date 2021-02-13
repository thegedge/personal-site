import {
  faBitbucket,
  faGithub,
  faTwitter,
  faWikipediaW,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isExternalUrl } from "../utils";

export const Link = (props: { href: string; className?: string; children: React.ReactNode }) => {
  const className =
    "text-primary-700 border-primary-300 border-b-2 hover:text-primary-400 ease-out-colors";

  let icon;
  if (props.href.includes("github.com")) {
    icon = <FontAwesomeIcon style={{ marginBottom: "0.15em" }} icon={faGithub} size="xs" />;
  } else if (props.href.includes("wikipedia.org")) {
    icon = <FontAwesomeIcon style={{ marginBottom: "0.15em" }} icon={faWikipediaW} size="xs" />;
  } else if (props.href.includes("youtube.com")) {
    icon = <FontAwesomeIcon style={{ marginBottom: "0.15em" }} icon={faYoutube} size="sm" />;
  } else if (props.href.includes("twitter.com")) {
    icon = <FontAwesomeIcon style={{ marginBottom: "0.15em" }} icon={faTwitter} size="xs" />;
  } else if (props.href.includes("bitbucket.org")) {
    icon = <FontAwesomeIcon style={{ marginBottom: "0.15em" }} icon={faBitbucket} size="xs" />;
  } else if (isExternalUrl(props.href)) {
    icon = (
      <FontAwesomeIcon style={{ marginBottom: "0.15em" }} icon={faExternalLinkAlt} size="xs" />
    );
  }

  // TODO Verify no 404s if process.env.CHECK_LINKS

  if (icon) {
    return (
      <a href={props.href} className={`${className} ${props.className}`}>
        {props.children}
        <span className="whitespace-nowrap">&nbsp;{icon}</span>
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
