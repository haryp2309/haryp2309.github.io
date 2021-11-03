import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { RepoData } from "../typings/repoData";
import { useEffect } from "react";
import { fetchRepoData } from "./api/repos";
import githubSvg from "../icons/github.svg";
import Image from "next/image";

type HomeProps = {
  repos: RepoData[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { repos } = props;
  return (
    <motion.div className={styles.container}>
      <div className={styles["centered-container"]}>
        {repos.map(({ description, name, id, url }) => (
          <div
            className={`${styles.box} clickable`}
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
        ))}
      </div>
    </motion.div>
  );
};

Home.getInitialProps = async () => {
  const repos: RepoData[] = await fetchRepoData();
  return { repos };
};

export default Home;
