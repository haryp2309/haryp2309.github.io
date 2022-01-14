import { SocialMediaButtons } from "components/socialMediaButtons";
import { AboutMe } from "containers/home/aboutMe.container";
import { Repos } from "containers/home/repos.container";
import { motion } from "framer-motion";
import { useMobileScreen } from "hooks/mobileScreen";
import type { GetStaticProps, NextPage } from "next";
import Header from "next/head";
import { WeeklyActivity } from "typings/weeklyActivity";
import styles from "../styles/Home.module.css";
import { RepoData } from "../typings/repoData";
import { fetchRepoData } from "./api/repos";
import { fetchWeeklyActivity } from "./api/userActivity";

type HomeProps = {
  repos: RepoData[];
  weeklyActivities: WeeklyActivity[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { repos, weeklyActivities } = props;

  const isMobile = useMobileScreen();

  return (
    <>
      <Header>
        <title>{"Hary Pirajan's projects"}</title>
      </Header>
      <motion.div className={styles.container}>
        <div className={styles["centered-container"]}>
          {isMobile && <SocialMediaButtons />}
          <AboutMe weeklyActivities={weeklyActivities} />
          <Repos repos={repos} />
        </div>
      </motion.div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const repos: RepoData[] = await fetchRepoData();

  const weeklyActivities: WeeklyActivity[] = (
    await fetchWeeklyActivity(new Date().getFullYear())
  ).weeklyActivities;

  return {
    props: { repos, weeklyActivities } as HomeProps,
    revalidate: 10,
  };
};

export default Home;
