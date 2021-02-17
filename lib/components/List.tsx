type Alignment = "start" | "center" | "end" | "stretch";

interface ListProps {
  className?: string;
  childClassName?: string;
  spacing?: 0 | 1 | 2 | undefined;
  align?: Alignment;
  border?: boolean;
  direction?: "vertical" | "horizontal";
  children: React.ReactNode;
}

export const List = (props: ListProps) => {
  const align = props.align ?? "start";
  const direction = props.direction ?? "vertical";

  const isVertical = direction == "vertical";
  const classes = [];
  classes.push(isVertical ? "flex-col" : "flex-row");
  classes.push(direction == "vertical" ? "h-full" : "w-full");

  switch (props.spacing) {
    case 0:
      classes.push(isVertical ? "space-y-0" : "space-x-0");
      break;
    case 1:
      classes.push(isVertical ? "space-y-1" : "space-x-1");
      break;
    case 2:
      classes.push(isVertical ? "space-y-2" : "space-x-2");
      break;
    default:
      classes.push(isVertical ? "space-y-4" : "space-x-4");
      break;
  }

  if (props.border) {
    classes.push("divide-primary-200");
    classes.push(isVertical ? "divide-y" : "divide-x");
  }

  classes.push("items-center");
  switch (align) {
    case "center":
      classes.push("justify-center");
      break;
    case "end":
      classes.push("justify-end");
      break;
    case "start":
      classes.push("justify-start");
      break;
    case "stretch":
      classes.push("justify-stretch");
      break;
  }

  return (
    <div className={`flex mx-0 ${props.className || ""} ${classes.join(" ")}`}>
      {props.children}
    </div>
  );
};

export const HorizontalList = (props: Omit<ListProps, "direction">) => {
  return <List direction="horizontal" {...props} />;
};

export const VerticalList = (props: Omit<ListProps, "direction">) => {
  return <List direction="vertical" {...props} />;
};
