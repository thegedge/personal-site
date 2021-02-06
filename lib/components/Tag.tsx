export const Tag = (props: { children: string }) => {
  return (
    <span className="inline-block text-sm rounded p-2 bg-primary-500 text-primary-300">
      {props.children}
    </span>
  );
};
