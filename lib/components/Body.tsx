export const Body = (props: { className?: string; children?: React.ReactNode }) => {
  return (
    <main className={props.className}>
      <div className="py-4 lg:px-4 lg:py-8">{props.children}</div>
    </main>
  );
};
