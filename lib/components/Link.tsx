import { AiOutlineYoutube } from "react-icons/ai";
import { FaBitbucket, FaGithub, FaTwitter, FaWikipediaW } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { isExternalUrl } from "../utils";

export const Link = (props: { href: string; className?: string; children: React.ReactNode }) => {
  const className =
    "text-primary-700 border-primary-300 border-b-2 hover:text-primary-400 ease-out-colors";

  let icon;
  if (props.href.includes("://github.com")) {
    icon = <FaGithub className="align-baseline" size="0.8em" />;
  } else if (props.href.includes("wikipedia.org")) {
    icon = <FaWikipediaW className="align-text-bottom" size="1.15em" />;
  } else if (props.href.includes("youtube.com")) {
    icon = <AiOutlineYoutube className="align-text-bottom" size="1.25em" />;
  } else if (props.href.includes("twitter.com")) {
    icon = <FaTwitter className="align-text-bottom" />;
  } else if (props.href.includes("bitbucket.org")) {
    icon = <FaBitbucket size="0.8em" />;
  } else if (isExternalUrl(props.href)) {
    icon = <FiExternalLink className="align-baseline" size="0.8em" />;
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
