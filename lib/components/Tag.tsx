import { Color } from "../utils";

export const Tag = (props: { children: string | string[]; color?: Color }) => {
  const { fg, bg } = props.color || {
    bg: "bg-primary-500 hover:bg-primary-400",
    fg: "text-primary-300 hover:text-primary-200",
  };
  return (
    <span
      className={`inline-block text-sm sm:text-base ease-out-colors rounded py-1 px-2 lg:py-2 ${bg} ${fg}`}
    >
      {props.children}
    </span>
  );
};
