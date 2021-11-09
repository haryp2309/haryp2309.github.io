import { LINKED_IN_URL, USER_LINK } from "constants/user";
import { GitHubIcon } from "icons/GitHub.icon";
import { LinkedInIcon } from "icons/LinkedIn.icon";
import styles from "./SocialMediaButtons.module.css";

export type SocialMediaButtonsProps = {
  className?: string;
};

export const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = (
  props: SocialMediaButtonsProps
) => {
  const { className } = props;

  return (
    <div className={`${className} ${styles.container}`}>
      <a href={LINKED_IN_URL} target="_blank" rel="noreferrer">
        <LinkedInIcon className={styles.icon} />
      </a>
      <a href={USER_LINK} target="_blank" rel="noreferrer">
        <GitHubIcon className={styles.icon} />
      </a>
    </div>
  );
};
