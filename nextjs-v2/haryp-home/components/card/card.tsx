import { GitHubIcon } from "icons/GitHub.icon";
import { RepoData } from "../../typings/repoData";
import s from "./Card.module.css";

export type CardProps = {
  repoData: RepoData;
};

export const Card: React.FC<CardProps> = (props: CardProps) => {
  const { repoData } = props;
  const { description, highlighted, id, name, url } = repoData;
  return (
    <a
      className={`${s.box} clickable ${highlighted ? s.highlighted : ""}`}
      key={id}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <div className={s["name"]}>{name}</div>
      <div className={s.description}>{description}</div>
      <div className={s["repo-provider-logo-container"]}>
        <GitHubIcon white={highlighted} className={s["repo-provider-logo"]} />
      </div>
    </a>
  );
};
