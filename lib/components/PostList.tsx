import { concat, groupBy, identity, orderBy } from "lodash";
import moment from "moment";
import React from "react";
import { PostData } from "../posts";
import { HorizontalList, VerticalList } from "./List";
import { Tag } from "./Tag";

const PostListItem = (props: { post: PostData }) => {
  let index = 0;
  return (
    <div className={`flex flex-row w-full p-4 ${!props.post.published && "bg-yellow-100"}`}>
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
      <div className="text-right">
        <HorizontalList align="end" spacing={1}>
          {concat([], props.post.tags).map((tag) => (
            <Tag key={index++}>{tag}</Tag>
          ))}
        </HorizontalList>
      </div>
    </div>
  );
};

export const PostList = (props: { posts: PostData[] }) => {
  let index = 0;
  const posts = groupBy(props.posts, (post) => new Date(post.date).getFullYear());
  return (
    <VerticalList spacing={0}>
      {orderBy(Object.keys(posts), identity, "desc").map((year) => (
        <>
          <h2 className="text-center bg-primary-50 py-4">{year}</h2>
          <VerticalList border spacing={1}>
            {posts[year].map((post) => (
              <PostListItem key={index++} post={post} />
            ))}
          </VerticalList>
        </>
      ))}
    </VerticalList>
  );
};
