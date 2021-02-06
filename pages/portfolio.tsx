import { concat } from "lodash";
import React from "react";
import { Layout } from "../lib/components/Layout";
import { HorizontalList } from "../lib/components/List";

const LinkList = (props: { children: React.ReactElement | React.ReactElement[] }) => {
  const children = concat([], props.children);
  return (
    <HorizontalList className="text-sm float-right px-4" spacing={1}>
      {children.map((child) => (
        <a
          className="inline-block py-2 px-4 bg-primary-200 hover:bg-primary-300 transition-colors ease-in-out duration-300"
          {...child.props}
        />
      ))}
    </HorizontalList>
  );
};

export default function Portfolio() {
  return (
    <Layout title="Portfolio" description="A portfolio full of things I've built">
      <ul className="flex flex-col mx-0 list-none divide-y divide-primary-200 text-lg leading-8">
        <li className="relative overflow-hidden">
          <img
            src="/img/portfolio/opgraph/opgraph_bg.png"
            className="absolute w-full h-auto left-0 top-0 z-behind"
          />
          <div className="px-4 min-h-32">
            <h2>OpGraph Framework</h2>
            <div>
              <p>
                The OpGraph project provides a framework for building complex operations from
                simpler ones. Written in Java, the project includes:
              </p>
              <ul>
                <li>a graph data structure for constructing operations,</li>
                <li>a processing context for fine control over execution,</li>
                <li>a context structure for controlling the data flow in the graph,</li>
                <li>
                  an application framework for creating a custom editor to create and edit graphs,
                  and
                </li>
                <li>XML persistence.</li>
              </ul>
            </div>
          </div>
          <LinkList>
            <a href="https://thegedge.github.com/opgraph">View Project Page</a>
            <a href="https://github.com/thegedge/opgraph">View GitHub Page</a>
          </LinkList>
        </li>
        <li className="relative overflow-hidden">
          <img
            src="/img/portfolio/voxel_iterator/voxel_iterator_bg.png"
            className="absolute w-1/2 h-auto left-1/4 top-0 z-behind"
          />
          <div className="px-4 min-h-32">
            <h2>Voxel (grid-based) Iterator</h2>
            <div>
              <p>A C++ iterator for iterating over 3D grids.</p>
            </div>
          </div>
          <LinkList>
            <a href="https://github.com/thegedge/voxel_iterator">View GitHub Page</a>
          </LinkList>
        </li>
        <li className="relative overflow-hidden">
          <img
            src="/img/portfolio/radix_tree/radix_tree_bg.png"
            className="absolute w-full h-auto left-0 top-0 z-behind"
          />
          <div className="px-4 min-h-32">
            <h2>Radix Tree</h2>
            <div>
              <p>
                A Java implementation of the radix tree data structure, written during my time on
                the <a href="https://www.phon.ca">Phon project</a>. This implementation mostly
                implements the <code>java.util.Map</code> interface.
              </p>
            </div>
          </div>
          <LinkList>
            <a href="https://github.com/thegedge/radix_tree">View GitHub Page</a>
          </LinkList>
        </li>
        <li className="relative overflow-hidden">
          <img
            src="/img/portfolio/stereo/stereo_bg.png"
            className="absolute w-1/2 h-auto left-1/2 top-24 z-behind"
          />
          <div className="px-4 min-h-32">
            <h2>Stereo Reconstruction</h2>
            <div>
              <p>
                Source code to the stereo vision work I done during my Masters research. Some things
                one can find in this work:
              </p>
              <p>
                <ul>
                  <li>a simple XML project format,</li>
                  <li>
                    basic two-view stereo implementation using method in cooperation with
                    <a href="https://dl.acm.org/citation.cfm?id=1819315">
                      geodesic support weights
                    </a>
                    ,
                  </li>
                  <li>
                    partial implementation of{" "}
                    <a href="https://portal.acm.org/citation.cfm?id=1478454">this</a>
                    multi-view stereo method,
                  </li>
                  <li>rendering of point (basic and splats) and mesh models,</li>
                  <li>
                    camera response curve calibration via
                    <a href="https://www.pauldebevec.com/Research/HDR/">Debevec's method</a>,
                  </li>
                  <li>image capture via Point Grey FlyCap,</li>
                  <li>multi-camera calibration via OpenCV,</li>
                  <li>simple task system where tasks can be run in background, and</li>
                  <li>
                    implementation of the refractive epipolar geometry method outlined in my M.Sc.
                    thesis.
                  </li>
                </ul>
              </p>
              <div className="grid grid-cols-3 my-4">
                <img src="/img/portfolio/stereo/stereo1.png" alt="Task progress window" />
                <img
                  src="/img/portfolio/stereo/stereo2.png"
                  alt="Visualizing the positions and orientations of cameras"
                />
                <img src="/img/portfolio/stereo/stereo3.png" alt="Stereo view window" />
                <img src="/img/portfolio/stereo/stereo4.png" alt="Features have been detected" />
                <img
                  src="/img/portfolio/stereo/stereo5.png"
                  alt="A selected feature is circled in one image, and its corresponding epipolar curve is displayed in green in the opposite image"
                />
              </div>
            </div>
          </div>
          <LinkList>
            <a href="https://github.com/thegedge/StereoReconstruction">View GitHub Page</a>
          </LinkList>
        </li>
        <li className="relative overflow-hidden">
          <img
            src="/img/portfolio/manatee/manatee_bg.png"
            className="absolute w-full h-auto left-0 -top-36 z-behind"
          />
          <div className="px-4 min-h-32">
            <h2>Manatee</h2>
            <div>
              A messaging library for Java, making extensive use of annotations to describe and pass
              messages.
            </div>
          </div>
          <LinkList>
            <a href="https://github.com/thegedge/manatee">View GitHub Page</a>
          </LinkList>
        </li>
        <li className="relative overflow-hidden">
          <img
            src="/img/portfolio/jype/jype_bg.png"
            className="absolute w-full h-auto left-0 top-0 z-behind"
          />
          <div className="px-4 min-h-32">
            <h2>Jype</h2>
            <div>
              A Java library for describing types. Primarily used to describe generic parameter
              types at runtime.
            </div>
          </div>
          <LinkList>
            <a href="https://github.com/thegedge/jype">View GitHub Page</a>
          </LinkList>
        </li>
      </ul>
    </Layout>
  );
}
