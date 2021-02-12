export const Tag = (props: { children: string; color?: { bg: string; fg: string } }) => {
  const { fg, bg } = props.color || { bg: "bg-primary-500", fg: "text-primary-300" };
  return (
    <span className={`inline-block text-xs sm:text-sm rounded py-1 px-2 ${bg} ${fg}`}>
      {props.children}
    </span>
  );
};
