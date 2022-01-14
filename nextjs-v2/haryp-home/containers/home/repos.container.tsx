import { Card } from "components/card";
import { Chip } from "components/chip";
import { AnimatePresence, motion } from "framer-motion";
import { useMobileScreen } from "hooks/mobileScreen";
import { useLocale } from "hooks/useLocale";
import { useEffect, useState } from "react";
import { RepoData } from "typings/repoData";
import styles from "./Repos.module.css";

export type ReposProps = {
  className?: string;
  repos: RepoData[];
};

export const Repos: React.FC<ReposProps> = (props: ReposProps) => {
  const { className, repos } = props;

  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const isMobile = useMobileScreen();
  const { t } = useLocale();

  useEffect(() => {
    const newTopics: { name: string; count: number }[] = [];
    repos.forEach(({ topics }) => {
      topics.forEach((topic) => {
        const existingTopic = newTopics.find(
          (existing) => existing.name === topic
        );
        if (existingTopic) existingTopic.count += 1;
        else newTopics.push({ name: topic, count: 0 });
      });
    });
    setTopics(
      newTopics.sort((a, b) => b.count - a.count).map(({ name }) => name)
    );
  }, [repos]);

  const toggleTopic = (topic: string) => () => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const visibleRepos = repos.filter(
    ({ topics }) =>
      selectedTopics.length === 0 ||
      topics
        .map((topic) => selectedTopics.includes(topic))
        .reduce((a, b) => a || b, false)
  );

  const generateRepoCards = (onlyHighlighted: boolean) => (
    <AnimatePresence>
      {visibleRepos
        .filter(({ highlighted }) =>
          onlyHighlighted ? highlighted : !highlighted
        )
        .map((repoData) => (
          <motion.div
            key={repoData.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles["card-wrapper"]}`}
          >
            <Card repoData={repoData} />
          </motion.div>
        ))}
    </AnimatePresence>
  );

  return (
    <section className={className}>
      <h1>{t("repos")}</h1>
      <h2>{t("filters")}</h2>
      <div className={styles["chips-container"]}>
        {(showAllTopics ? topics : topics.slice(0, 8)).map((label) => (
          <Chip
            key={label}
            label={label}
            onClick={toggleTopic(label)}
            active={selectedTopics.includes(label)}
          />
        ))}
        <a
          className={styles["show-all-button"]}
          onClick={() => setShowAllTopics((v) => !v)}
        >
          {t(showAllTopics ? "showLess" : "showAll")}
        </a>
      </div>
      <h2>{t("highlighted")}</h2>

      <div
        className={`${styles["card-grid"]} ${isMobile ? styles.mobile : ""}`}
      >
        {generateRepoCards(true)}
      </div>
      <h2>{t("other")}</h2>
      <div
        className={`${styles["card-grid"]} ${isMobile ? styles.mobile : ""}`}
      >
        {generateRepoCards(false)}
      </div>
    </section>
  );
};
