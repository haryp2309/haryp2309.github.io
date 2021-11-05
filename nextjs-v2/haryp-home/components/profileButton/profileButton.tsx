import styles from "./ProfileButton.module.css";
import { NextComponentType } from "next";
import { motion } from "framer-motion";
import { USER_LINK } from "../../constants/user";
import { FILEPATH } from "pages/api/pb";
import Image from "next/image";

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
      href={USER_LINK}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={FILEPATH}
        alt="Profile picture"
        className={styles.circle}
        width={65}
        height={65}
      />
    </motion.a>
  );
};
