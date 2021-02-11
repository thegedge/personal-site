import { concat } from "lodash";

type Alignment = "start" | "center" | "end" | "stretch";

interface ListProps {
  className?: string;
  childClassName?: string;
  spacing?: number;
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
    default:
      classes.push(isVertical ? "space-y-4" : "space-x-4");
      break;
  }

  if (props.border) {
    classes.push("divide-y divide-primary-200");
  }

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

  const childClassNames = direction == "vertical" ? "w-full" : "h-full";

  let index = 0;
  return (
    <ul className={`list-none flex mx-0 ${props.className || ""} ${classes.join(" ")}`}>
      {concat([], props.children).map((c) => (
        <li className={`block ${props.childClassName || ""} ${childClassNames}`} key={index++}>
          {c}
        </li>
      ))}
    </ul>
  );
};

export const HorizontalList = (props: Omit<ListProps, "direction">) => {
  return <List direction="horizontal" {...props} />;
};

export const VerticalList = (props: Omit<ListProps, "direction">) => {
  return <List direction="vertical" {...props} />;
};
