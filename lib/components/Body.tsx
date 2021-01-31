export const Body = (props: { className?: string; children?: React.ReactNode }) => {
  return (
    <main className={props.className}>
      <div className="px-4 py-8">{props.children}</div>
      {/* <aside className="flex-1 p-8 min-w-1/4">...</aside> */}
    </main>
  );
};
