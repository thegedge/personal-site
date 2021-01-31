import { orderBy } from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { Layout } from "../lib/components/Layout";
import Markdown from "../lib/components/Markdown";
import posts, { PostData } from "../lib/posts";

export default function Home(props: { posts: PostData[] }) {
  return (
    <Layout title="Publications" description="Things I've published">
      <Markdown>
        {`
## Refereed Conference Publications

* Gedge, J., Gong, M., and Yang, Y-H. (2011) _Refractive Epipolar Geometry For Underwater Stereo Matching_. Proceedings of the Eighth Canadian Conference on Computer and Robot Vision.
* van Rooij, I., Evans, P., Muller, M., Gedge, J., and Wareham, T. (2008) _Identifying Sources of Intractability in Cognitive Models: An Illustration using Analogical Structure Mapping_. In B.C. Love, K. McRae, and V.M. Sloutsky (eds.) Proceedings of the 30th Annual Meeting of the Cognitive Science Society. Cognitive Science Society; Austin, TX. 915—920.
* Gedge, J., Hedlund, G., Rose, Y., and Wareham, T. (2007) _Natural Language Process Detection: From Conception to Implementation_. Newfoundland Electrical and Computer Engineering Conference.

## Technical Reports

* Evans, P., Gedge, J., Muller, M., van Rooij, I., and Wareham, T. (2008) _On the Computational Complexity of Analogy Derivation in the Structure-Mapping Framework_. Technical Report 2008-03, Department of Computer Science, Memorial University of Newfoundland.

## Theses

* Gedge, J. (2011) _Underwater Stereo Matching and its Calibration_. Department of Computing Science, University of Alberta. _M.Sc_.
* Gedge, J. (2008) _Automatic Panorama Construction: An In-Depth Look Into Image Stitching_. Department of Computer Science, Memorial University of Newfoundland. _B.Sc. (Honours)_.
      `}
      </Markdown>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const allPosts = orderBy(await posts(), "date", "desc");
  return { props: { posts: allPosts } };
};