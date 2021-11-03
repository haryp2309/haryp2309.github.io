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
  const scrollingDirection = useScrollDirection(50);
  const showHeader = scrollingDirection == "up";

  return (
    <motion.div
      initial={false}
      animate={{ y: showHeader ? 0 : "-100%" }}
      transition={{ duration: 0.2 }}
      className={styles.header}
    >
      <div className={styles["page-title"]}>{"Hary Pirajan's Projects"}</div>
      <div className={styles["space"]} />
      <ProfileButton />
    </motion.div>
  );
};
