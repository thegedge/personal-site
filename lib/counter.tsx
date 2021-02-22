import { createContext, useContext } from "react";

interface CounterData {
  prefix: string;
  value: number;
}

const CounterContext = createContext<CounterData>({
  prefix: "",
  value: 0,
});

export function KeyCounter(props: { prefix?: string; children: React.ReactNode }) {
  const previous = useContext(CounterContext);

  let prefix = props.prefix || "";
  if (previous.prefix === "") {
    prefix = `${previous.prefix}${previous.value}-${props.prefix}`;
  }

  return (
    <CounterContext.Provider value={{ prefix, value: 0 }}>{props.children}</CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  context.value += 1;
  return `${context.prefix}${context.value}`;
}
