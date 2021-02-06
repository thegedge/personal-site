import { orderBy } from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { Layout } from "../lib/components/Layout";
import { VerticalList } from "../lib/components/List";
import posts, { PostData } from "../lib/posts";

export default function Home(props: { posts: PostData[] }) {
  return (
    <Layout title="Publications" description="Things I've published">
      <VerticalList border className="text-lg leading-8">
        <div className="px-4">
          <h2>Refereed Conference Publications</h2>
          <ul>
            <li>
              Gedge, J., Gong, M., and Yang, Y-H. (2011){" "}
              <em>Refractive Epipolar Geometry For Underwater Stereo Matching</em>. Proceedings of
              the Eighth Canadian Conference on Computer and Robot Vision.
            </li>
            <li>
              van Rooij, I., Evans, P., Muller, M., Gedge, J., and Wareham, T. (2008){" "}
              <em>
                Identifying Sources of Intractability in Cognitive Models: An Illustration using
                Analogical Structure Mapping
              </em>
              . In B.C. Love, K. McRae, and V.M. Sloutsky (eds.) Proceedings of the 30th Annual
              Meeting of the Cognitive Science Society. Cognitive Science Society; Austin, TX.
              915—920.
            </li>
            <li>
              Gedge, J., Hedlund, G., Rose, Y., and Wareham, T. (2007){" "}
              <em>Natural Language Process Detection: From Conception to Implementation</em>.
              Newfoundland Electrical and Computer Engineering Conference.
            </li>
          </ul>
        </div>
        <div className="px-4">
          <h2>Technical Reports</h2>
          <ul>
            <li>
              Evans, P., Gedge, J., Muller, M., van Rooij, I., and Wareham, T. (2008){" "}
              <em>
                On the Computational Complexity of Analogy Derivation in the Structure-Mapping
                Framework
              </em>
              . Technical Report 2008-03, Department of Computer Science, Memorial University of
              Newfoundland.
            </li>
          </ul>
        </div>
        <div className="px-4">
          <h2>Theses</h2>
          <ul>
            <li>
              Gedge, J. (2011) <em>Underwater Stereo Matching and its Calibration</em>. Department
              of Computing Science, University of Alberta. <em>Master of Science</em>.
            </li>
            <li>
              Gedge, J. (2008){" "}
              <em>Automatic Panorama Construction: An In-Depth Look Into Image Stitching</em>.
              Department of Computer Science, Memorial University of Newfoundland.{" "}
              <em>Bachelor of Science (Honours)</em>.
            </li>
          </ul>
        </div>
      </VerticalList>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const allPosts = orderBy(await posts(), "date", "desc");
  return { props: { posts: allPosts } };
};
