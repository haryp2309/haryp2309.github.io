import { RepoData } from "../../typings/repoData";
import Image from "next/image";
import styles from "./Card.module.css";
import githubSvg from "../../icons/github.svg";

export type CardProps = {
  repoData: RepoData;
};

export const Card: React.FC<CardProps> = (props: CardProps) => {
  const { repoData } = props;
  const { description, highlighted, id, name, url } = repoData;
  return (
    <div
      className={`${styles.box} clickable ${
        highlighted ? styles.highlighted : ""
      }`}
      key={id}
      onClick={() => window.open(url)}
    >
      <div className={styles["name"]}>{name}</div>
      <div>{description}</div>
      <div className={styles["repo-provider-logo-container"]}>
        <Image
          className={styles["repo-provider-logo"]}
          alt="Repo provider logo"
          src={githubSvg}
          height="30px"
          width="30px"
        />
      </div>
    </div>
  );
};
