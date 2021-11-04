import styles from "./ProfileButton.module.css";
import { NextComponentType } from "next";
import { motion } from "framer-motion";
import { USER_LINK } from "../../constants/user";

export type ProfileButtonProps = {
  children?: React.ReactNode;
};

export const ProfileButton: NextComponentType = (props: ProfileButtonProps) => {
  return (
    <motion.a
      animate={{
        rotate: [-360, 0],
      }}
      transition={{ duration: 0.5 }}
      className={`${styles.circle} clickable`}
      href={USER_LINK}
      target="_blank"
      rel="noreferrer"
    />
  );
};
