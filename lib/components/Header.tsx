import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HorizontalList, VerticalList } from "./List";

export const Header = (props: { className?: string }) => {
  return (
    <div
      className={`flex flex-col text-center pt-8 mx-auto border-primary-200 md:border-r-1 md:text-right md:pr-6 md:ml-8 space-y-4 ${props.className}`}
    >
      <header className="px-4">
        <img src="/img/me.jpg" className="rounded-full w-48 mx-auto mb-4 ring-primary-300 ring" />
        <h1 className="mb-0">Jason Gedge</h1>
      </header>
      <div className="px-4 text-primary-600 text-xl">
        <HorizontalList align="center">
          <a
            href="https://www.twitter.com/thegedge"
            className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.github.com/thegedge"
            className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/pub/jason-gedge/32/484/863"
            className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="/feed.xml"
            target="_blank"
            className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
          >
            <FontAwesomeIcon icon={faRss} />
          </a>
        </HorizontalList>
      </div>
      <nav className="px-4 border-primary-200 md:border-t-1 md:pt-4">
        <VerticalList align="end">
          <a href="/about">About</a>
          <a href="/">Blog</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/publications">Publications</a>
        </VerticalList>
      </nav>
      <div className="bg-yellow-100 flex-initial w-56 mx-auto text-left font-bold text-yellow-900 text-sm p-4 rounded-lg border-yellow-300 border-1">
        Currently migrating my old site to nextjs and netlify, so expect some issues
      </div>
    </div>
  );
};
