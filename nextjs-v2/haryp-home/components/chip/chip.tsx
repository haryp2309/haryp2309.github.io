import { useState } from "react";
import styles from "./Chip.module.css";

export type ChipProps = {
  className?: string;
  label: string;
  onClick: () => void;
  active: boolean;
};

export const Chip: React.FC<ChipProps> = (props: ChipProps) => {
  const { className, label, onClick, active } = props;

  return (
    <div
      className={`${className} ${styles.chip} clickable ${
        active ? styles.active : ""
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
