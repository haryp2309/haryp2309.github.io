import { SocialMediaButtons } from "components/socialMediaButtons";
import { Toggle } from "components/toggle";
import { useMobileScreen } from "hooks/mobileScreen";
import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import { useScrollDirection } from "../../hooks/scrollDirection";
import { ProfileButton } from "../profileButton";
import styles from "./Header.module.css";

export type HeaderProps = {
  children?: React.ReactNode;
};

export const Header: NextComponentType = (props: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [overrideSystemTheme, setOverrideSystemTheme] = useState(false);
  const [title, setTitle] = useState("");
  const isMobile = useMobileScreen();

  useEffect(() => {
    document
      .getElementsByTagName("body")[0]
      .classList.remove(darkMode ? "light" : "dark");
    document
      .getElementsByTagName("body")[0]
      .classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const titleString = "@haryp2309";

    for (let i = 0; i <= titleString.length; i++) {
      setTimeout(() => {
        setTitle(titleString.substring(0, i));
      }, i * 100 + 200);
    }
  }, []);

  useEffect(() => {
    const listenerName = "change";
    const listener = (e: any) =>
      !overrideSystemTheme &&
      (e.matches ? setDarkMode(true) : setDarkMode(false));
    const matcher = matchMedia("(prefers-color-scheme: dark)");
    matcher.addEventListener(listenerName, listener);
    if (!overrideSystemTheme)
      matcher.matches ? setDarkMode(true) : setDarkMode(false);
    return () => matcher.removeEventListener(listenerName, listener);
  }, [overrideSystemTheme]);

  const handleToggle = () => {
    setDarkMode((v) => !v);
    setOverrideSystemTheme(true);
  };

  return (
    <header className={`${styles.header} trans-all`}>
      <h1 className={styles["page-title"]}>{title}</h1>
      <div className={styles["space"]} />
      {!isMobile && <SocialMediaButtons />}
      <Toggle onToggle={handleToggle} checked={darkMode} />
      <ProfileButton />
    </header>
  );
};
