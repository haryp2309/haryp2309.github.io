import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { NextComponentType } from "next";
import { useCallback, useEffect, useState } from "react";
import { useScrollDirection } from "../../hooks/scrollDirection";
import { ProfileButton } from "../profileButton";
import { Toggle } from "components/toggle";
import { SocialMediaButtons } from "components/socialMediaButtons";
import { useMobileScreen } from "hooks/mobileScreen";

export type HeaderProps = {
  children?: React.ReactNode;
};

export const Header: NextComponentType = (props: HeaderProps) => {
  const { scrollingDirection, scrollLevel } = useScrollDirection(50);
  const [darkMode, setDarkMode] = useState(false);
  const [overrideSystemTheme, setOverrideSystemTheme] = useState(false);
  const [title, setTitle] = useState("");
  const isMobile = useMobileScreen();

  const showHeader = scrollingDirection == "up";

  const transparentClassName = scrollLevel < 50 ? styles.transparent : "";

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
    <motion.header
      initial={false}
      animate={{ y: true ? 0 : "-100%" }}
      transition={{ duration: 0.2 }}
      className={`${styles.header} ${transparentClassName} trans-all`}
    >
      <h1 className={styles["page-title"]}>{title}</h1>
      <div className={styles["space"]} />
      {!isMobile && <SocialMediaButtons />}
      <Toggle onToggle={handleToggle} checked={darkMode} />
      <ProfileButton />
    </motion.header>
  );
};
