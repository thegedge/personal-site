import { concat } from "lodash";
import moment from "moment";
import { PostData } from "../posts";
import { HorizontalList, VerticalList } from "./List";
import { Tag } from "./Tag";

const PostListItem = (props: { post: PostData }) => {
  let index = 0;
  return (
    <div className="flex flex-row w-full p-4">
      <div className="flex-1">
        <a className="text-xl" href={`/posts/${props.post.slug}`}>
          {props.post.title}
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
            <Tag key={index++} tag={tag} />
          ))}
        </HorizontalList>
      </div>
    </div>
  );
};

export const PostList = (props: { posts: PostData[] }) => {
  let index = 0;
  return (
    <VerticalList border spacing={0}>
      {props.posts.map((post) => (
        <PostListItem key={index++} post={post} />
      ))}
    </VerticalList>
  );
};
