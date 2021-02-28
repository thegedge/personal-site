import { orderBy } from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { VerticalList } from "../lib/components/List";
import { Layout } from "../lib/layouts/Layout";
import posts, { PostData } from "../lib/posts";

export default function Home(props: { posts: PostData[] }) {
  return (
    <Layout title="Publications" description="Things I've published">
      <VerticalList border className="text-md leading-8">
        <div className="px-4">
          <h2>Theses</h2>
          <ul className="mx-4">
            <li>
              Gedge, J. (2011) <strong>Underwater Stereo Matching and its Calibration</strong>.
              Department of Computing Science, University of Alberta. <em>Master of Science</em>.
            </li>
            <li>
              Gedge, J. (2008){" "}
              <strong>
                Automatic Panorama Construction: An In-Depth Look Into Image Stitching
              </strong>
              . Department of Computer Science, Memorial University of Newfoundland.{" "}
              <em>Bachelor of Science (Honours)</em>.
            </li>
          </ul>
        </div>
        <div className="px-4">
          <h2>Refereed Conference Publications</h2>
          <ul className="mx-4">
            <li>
              Gedge, J., Gong, M., and Yang, Y-H. (2011){" "}
              <strong>Refractive Epipolar Geometry For Underwater Stereo Matching</strong>.
              Proceedings of the Eighth Canadian Conference on Computer and Robot Vision.
            </li>
            <li>
              van Rooij, I., Evans, P., Muller, M., Gedge, J., and Wareham, T. (2008){" "}
              <strong>
                Identifying Sources of Intractability in Cognitive Models: An Illustration using
                Analogical Structure Mapping
              </strong>
              . In B.C. Love, K. McRae, and V.M. Sloutsky (eds.) Proceedings of the 30th Annual
              Meeting of the Cognitive Science Society. Cognitive Science Society; Austin, TX.
              915—920.
            </li>
            <li>
              Gedge, J., Hedlund, G., Rose, Y., and Wareham, T. (2007){" "}
              <strong>Natural Language Process Detection: From Conception to Implementation</strong>
              . Newfoundland Electrical and Computer Engineering Conference.
            </li>
          </ul>
        </div>
        <div className="px-4">
          <h2>Technical Reports</h2>
          <ul className="mx-4">
            <li>
              Evans, P., Gedge, J., Muller, M., van Rooij, I., and Wareham, T. (2008){" "}
              <strong>
                On the Computational Complexity of Analogy Derivation in the Structure-Mapping
                Framework
              </strong>
              . Technical Report 2008-03, Department of Computer Science, Memorial University of
              Newfoundland.
            </li>
          </ul>
        </div>
      </VerticalList>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};

export const getStaticProps: GetStaticProps = async (_context) => {
  const allPosts = orderBy(await posts(), "date", "desc");
  return { props: { posts: allPosts } };
};
