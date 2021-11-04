import { NextComponentType } from "next";
import { Header } from "./header";
import styles from "./Layout.module.css";

export type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: NextComponentType = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
      <div className={styles["footer"]}></div>
    </>
  );
};
