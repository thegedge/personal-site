import { ceil, concat, flatMap, groupBy, identity, orderBy, uniq } from "lodash";
import moment from "moment";
import React from "react";
import { BsCalendar, BsClock } from "react-icons/bs";
import { PostData } from "../posts";
import { Color, stableColors } from "../utils";
import { HorizontalList, VerticalList } from "./List";
import { Tag } from "./Tag";

const PostListItem = (props: { post: PostData; tagColors: Record<string, Color> }) => {
  let index = 0;
  const readingTime = props.post.markdown.node.readingTime as number | undefined;
  return (
    <div
      className={`flex flex-col sm:flex-row w-full p-4 ${!props.post.published && "bg-yellow-100"}`}
    >
      <div className="flex-1">
        <a href={`/blog/${props.post.slug}`}>
          <span className="text-xl">{props.post.title}</span>
          {!props.post.published && (
            <>
              {" "}
              <Tag color={{ bg: "bg-yellow-200", fg: "text-yellow-500" }}>unpublished</Tag>
            </>
          )}
        </a>
        <HorizontalList border spacing={2}>
          <p className="text-sm text-primary-400">
            <BsCalendar />{" "}
            <time dateTime={props.post.date}>{moment(props.post.date).format("LL")}</time>
          </p>
          {readingTime && (
            <p className="text-sm font-thin text-primary-400 pl-2">
              <BsClock /> {ceil(readingTime)} minute read
            </p>
          )}
        </HorizontalList>
      </div>
      <HorizontalList align="end" spacing={1} className="flex-0">
        {concat([], props.post.tags).map((tag) => (
          <a key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
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
  const posts = groupBy(props.posts, (post) => new Date(post.date).getFullYear());
  return (
    <VerticalList spacing={0}>
      {orderBy(Object.keys(posts), identity, "desc").map((year) => (
        <div className="w-full">
          <h2 className="text-center bg-primary-100 py-4">{year}</h2>
          <VerticalList border spacing={1}>
            {posts[year].map((post) => (
              <PostListItem post={post} tagColors={tagColors} />
            ))}
          </VerticalList>
        </div>
      ))}
    </VerticalList>
  );
};
