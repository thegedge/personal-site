import {
  faBrain,
  faGraduationCap,
  faLaptopCode,
  faPeopleArrows,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Layout } from "../lib/components/Layout";
import { Link } from "../lib/components/Link";

export default function About() {
  return (
    <Layout title="About Me" description="A few things about me">
      <div className="text-lg leading-8">
        <p className="my-6">
          <FontAwesomeIcon icon={faBrain} size="2x" className="float-right ml-4 mt-2" />
          The name's <strong>Jason Gedge</strong>, but you've probably already figured that out. I'm
          a <strong>problem solver</strong>, with software being my medium of choice. Naturally,
          that led me to becoming a <strong>software developer</strong>.
        </p>
        <p className="my-6">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" className="float-right ml-4 mt-2" />
          In 2011, I received my <strong>Master of Science</strong> degree in Computing Science from
          the University of Alberta. My research took me into the field of{" "}
          <strong>computer vision</strong>, perhaps one of the fields of research I find most
          interesting. I also enjoy dabbling in <strong>computer graphics</strong>,{" "}
          <strong>image processing</strong>, and <strong>computational photography</strong> (kind of
          a hybrid of all of the above). In a more general sense, I am a big fan of processing and
          producing visual data.
        </p>
        <p className="my-6">
          <FontAwesomeIcon icon={faRunning} size="3x" className="float-right ml-4 mt-2" />
          Outside of work, I also enjoy <em>composing music</em> and <em>playing guitar</em>. In
          2015 I became interested in maintaining <strong>better health</strong>, so I became a
          runner. I've since ran many half-marathons, and aim to exercise every other day. In the
          summer, I aim for at least 20km per week. I grew up in the Canadian province of{" "}
          <Link href="https://en.wikipedia.org/wiki/Newfoundland_and_Labrador">
            Newfoundland and Labrador
          </Link>
          .
        </p>
        <p>
          <FontAwesomeIcon icon={faLaptopCode} size="2x" className="float-right ml-4 mt-2" />
          These days I'm working at <strong>Gadget</strong>, building the next generation
          development environment. Previously I worked at <strong>Shopify</strong> and{" "}
          <strong>YouTube</strong>, doing a little bit of everything, but with a lot of focus on
          developer productivity and software architecture.
        </p>
        <p className="my-6">
          <FontAwesomeIcon icon={faPeopleArrows} size="2x" className="float-right ml-4 mt-2" />
          If you happen to be interested in me and/or what I do, be sure to check me out on{" "}
          <Link href="https://www.github.com/thegedge/">GitHub</Link> or perhaps even some of my{" "}
          <Link href="https://www.twitter.com/thegedge/">Tweeting</Link>.
        </p>
      </div>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};
