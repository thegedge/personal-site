import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HorizontalList, VerticalList } from "./List";

export const Header = (props: { className?: string }) => {
  return (
    <div
      className={`flex flex-row lg:flex-col text-center p-4 lg:pt-8 mx-auto border-primary-200 lg:border-r-1 lg:pr-6 lg:ml-8 lg:space-y-4 ${
        props.className || ""
      }`}
    >
      <header className="px-4 flex flex-row lg:flex-col items-center space-x-8 lg:space-x-0">
        <img
          src="/img/me.jpg"
          className="rounded-full w-48 mx-auto mb-2 ring-primary-100 ring hidden sm:block"
        />
        <div>
          <h1 className="mb-0">Jason Gedge</h1>
          <div className="px-4 pt-2 text-primary-600 text-xl">
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
                className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
              >
                <FontAwesomeIcon icon={faRss} />
              </a>
            </HorizontalList>
          </div>
        </div>
      </header>
      <nav className="px-8 border-primary-200 lg:px-4 lg:border-t-1 lg:pt-4 lg:text-right">
        <VerticalList align="center" spacing={0}>
          <a
            className="inline-block w-full p-2 cursor-pointer hover:bg-primary-100 hover:transition-colors duration-500 ease-out"
            href="/about"
          >
            About
          </a>
          <a
            className="inline-block w-full p-2 cursor-pointer hover:bg-primary-100 hover:transition-colors duration-500 ease-out"
            href="/"
          >
            Blog
          </a>
          <a
            className="inline-block w-full p-2 cursor-pointer hover:bg-primary-100 hover:transition-colors duration-500 ease-out"
            href="/portfolio"
          >
            Portfolio
          </a>
          <a
            className="inline-block w-full p-2 cursor-pointer hover:bg-primary-100 hover:transition-colors duration-500 ease-out"
            href="/publications"
          >
            Publications
          </a>
        </VerticalList>
      </nav>
    </div>
  );
};
