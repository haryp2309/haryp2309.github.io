import { RepoData } from "../../typings/repoData";
import styles from "./Card.module.css";
import { GitHubIcon } from "icons/GitHub.icon";

export type CardProps = {
  repoData: RepoData;
};

export const Card: React.FC<CardProps> = (props: CardProps) => {
  const { repoData } = props;
  const { description, highlighted, id, name, url } = repoData;
  return (
    <a
      className={`${styles.box} clickable ${
        highlighted ? styles.highlighted : ""
      }`}
      key={id}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles["name"]}>{name}</div>
      <div>{description}</div>
      <div className={styles["repo-provider-logo-container"]}>
        <GitHubIcon className={styles["repo-provider-logo"]} />
      </div>
    </a>
  );
};
