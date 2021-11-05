import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { NextComponentType } from "next";
import { useCallback, useEffect, useState } from "react";
import { useScrollDirection } from "../../hooks/scrollDirection";
import { ProfileButton } from "../profileButton";

export type HeaderProps = {
  children?: React.ReactNode;
};

export const Header: NextComponentType = (props: HeaderProps) => {
  const { scrollingDirection, scrollLevel } = useScrollDirection(50);
  const showHeader = scrollingDirection == "up";

  const transparentClassName = scrollLevel < 50 ? styles.transparent : "";

  return (
    <motion.header
      initial={false}
      animate={{ y: true ? 0 : "-100%" }}
      transition={{ duration: 0.2 }}
      className={`${styles.header} ${transparentClassName} trans-all`}
    >
      <h1 className={styles["page-title"]}>{"Hary Pirajan's Projects"}</h1>
      <div className={styles["space"]} />
      <ProfileButton />
    </motion.header>
  );
};
