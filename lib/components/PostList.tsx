import { ceil, concat, filter, flatMap, groupBy, identity, orderBy, uniq } from "lodash";
import moment from "moment";
import React from "react";
import { BsCalendar, BsClock } from "react-icons/bs";
import { PostData } from "../posts";
import { Color, stableColors } from "../utils";
import { HorizontalList, VerticalList } from "./List";
import { Tag } from "./Tag";

export const PostPublishedAndMetadata = (props: { post: PostData }) => {
  const readingTime = props.post.markdown.node.readingTime as number | null | undefined;
  return (
    <HorizontalList border spacing={2}>
      <div className="text-primary-400">
        <BsCalendar className="align-baseline" />{" "}
        <time dateTime={props.post.date}>{moment(props.post.date).format("LL")}</time>
      </div>
      {readingTime && (
        <div className="font-thin text-primary-400 pl-2">
          <BsClock className="align-baseline" /> {ceil(readingTime)} minute read
        </div>
      )}
    </HorizontalList>
  );
};

const PostListItem = (props: { post: PostData; tagColors: Record<string, Color> }) => {
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
        <div className="text-sm">
          <PostPublishedAndMetadata post={props.post} />
        </div>
      </div>
      <HorizontalList align="end" spacing={1} className="mt-2 sm:m-0 flex-initial">
        {concat([], props.post.tags).map((tag) => (
          <a key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`}>
            <Tag color={props.tagColors[tag]}>{tag}</Tag>
          </a>
        ))}
      </HorizontalList>
    </div>
  );
};

export const PostList = (props: { posts: PostData[] }) => {
  const tagColors = stableColors(uniq(flatMap(props.posts, "tags")));

  let posts = props.posts;
  if (process.env.NODE_ENV !== "development") {
    posts = filter(posts, "published");
  }

  const postsByYear = groupBy(posts, (post) => new Date(post.date).getFullYear());
  return (
    <VerticalList spacing={0}>
      {orderBy(Object.keys(postsByYear), identity, "desc").map((year) => (
        <div key={year} className="w-full">
          <h2 className="text-center bg-primary-100 py-4">{year}</h2>
          <VerticalList border spacing={1}>
            {postsByYear[year].map((post) => (
              <PostListItem key={post.slug} post={post} tagColors={tagColors} />
            ))}
          </VerticalList>
        </div>
      ))}
    </VerticalList>
  );
};
