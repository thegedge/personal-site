import { concat, flatMap, groupBy, identity, orderBy, uniq } from "lodash";
import moment from "moment";
import React from "react";
import { PostData } from "../posts";
import { Color, stableColors } from "../utils";
import { HorizontalList, VerticalList } from "./List";
import { Tag } from "./Tag";

const PostListItem = (props: { post: PostData; tagColors: Record<string, Color> }) => {
  let index = 0;
  return (
    <div
      className={`flex flex-col sm:flex-row w-full p-4 ${!props.post.published && "bg-yellow-100"}`}
    >
      <div className="flex-1">
        <a className="text-xl" href={`/blog/${props.post.slug}`}>
          {props.post.title}
          {!props.post.published && (
            <>
              {" "}
              <Tag color={{ bg: "bg-yellow-200", fg: "text-yellow-500" }}>unpublished</Tag>
            </>
          )}
        </a>
        <p>
          <time dateTime={props.post.date} className="text-sm font-thin italic text-gray-400">
            {moment(props.post.date).format("LL")}
          </time>
        </p>
      </div>
      <HorizontalList align="end" spacing={1} className="flex-0">
        {concat([], props.post.tags).map((tag) => (
          <a href={`/blog/tag/${encodeURIComponent(tag)}`}>
            <Tag key={index++} color={props.tagColors[tag]}>
              {tag}
            </Tag>
          </a>
        ))}
      </HorizontalList>
    </div>
  );
};

export const PostList = (props: { posts: PostData[] }) => {
  const tagColors = stableColors(uniq(flatMap(props.posts, "tags")));
  let index = 0;
  const posts = groupBy(props.posts, (post) => new Date(post.date).getFullYear());
  return (
    <VerticalList spacing={0}>
      {orderBy(Object.keys(posts), identity, "desc").map((year) => (
        <>
          <h2 className="text-center bg-primary-50 py-4">{year}</h2>
          <VerticalList border spacing={1}>
            {posts[year].map((post) => (
              <PostListItem key={index++} post={post} tagColors={tagColors} />
            ))}
          </VerticalList>
        </>
      ))}
    </VerticalList>
  );
};
