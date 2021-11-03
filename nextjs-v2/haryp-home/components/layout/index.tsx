import { NextComponentType } from "next";
import { Header } from "./header";

export type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: NextComponentType = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};
