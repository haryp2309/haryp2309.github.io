import { useState } from "react";
import styles from "./Toggle.module.css";

export type ToggleProps = {
  className?: string;
  onToggle: () => void;
  checked: boolean;
};

export const Toggle: React.FC<ToggleProps> = (props: ToggleProps) => {
  const { className, onToggle, checked } = props;
  return (
    <div onClick={onToggle} className={`${className} ${styles.wrapper}`}>
      <label className={styles.switch}>
        <span
          className={`${styles.slider} ${styles.round} ${
            checked ? styles.checked : ""
          }`}
        />
      </label>
    </div>
  );
};
