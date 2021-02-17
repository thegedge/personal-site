import { FaGithub, FaLinkedin, FaRss, FaTwitter } from "react-icons/fa";
import { HorizontalList } from "./List";

export const Header = (props: { className?: string }) => {
  return (
    <div
      className={`flex flex-col text-center p-4 lg:pt-8 mx-auto border-primary-200 lg:border-r-1 lg:pr-6 lg:ml-8 lg:space-y-4 ${
        props.className || ""
      }`}
    >
      <header className="sm:px-4 flex flex-col sm:flex-row lg:flex-col items-center sm:space-x-8 lg:space-x-0">
        <div className="flex-1"></div>
        <img
          src="/img/me.jpg"
          alt="me"
          className="rounded-full w-48 mx-auto mb-2 ring-primary-100 ring"
        />
        <div>
          <h1 className="mb-0">Jason Gedge</h1>
          <div className="pt-2 text-primary-600 text-xl">
            <HorizontalList align="center">
              <a
                href="https://www.twitter.com/thegedge"
                className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.github.com/thegedge"
                className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/pub/jason-gedge/32/484/863"
                className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
              >
                <FaLinkedin />
              </a>
              <a
                href="/feed.xml"
                className="opacity-40 hover:opacity-100 transition-opacity ease-in-out duration-250"
              >
                <FaRss />
              </a>
            </HorizontalList>
          </div>
        </div>
        <div className="flex-1"></div>
      </header>
      <nav className="flex flex-row lg:flex-col sm:px-8 border-primary-200 lg:px-4 lg:border-t-1 lg:pt-4 lg:text-right">
        <a
          className="inline-block w-full p-2 hover:bg-primary-100 ease-out-colors-500"
          href="/about"
        >
          About
        </a>
        <a
          className="inline-block w-full p-2 hover:bg-primary-100 ease-out-colors-500"
          href="/blog"
        >
          Blog
        </a>
        <a
          className="inline-block w-full p-2 hover:bg-primary-100 ease-out-colors-500"
          href="/portfolio"
        >
          Portfolio
        </a>
        <a
          className="inline-block w-full p-2 hover:bg-primary-100 ease-out-colors-500"
          href="/publications"
        >
          Publications
        </a>
      </nav>
    </div>
  );
};
