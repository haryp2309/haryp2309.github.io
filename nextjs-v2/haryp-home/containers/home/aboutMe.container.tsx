import { CommitChart } from "components/commitChart";
import { SocialMediaButtons } from "components/socialMediaButtons";
import { useMobileScreen } from "hooks/mobileScreen";
import { WeeklyActivity } from "typings/weeklyActivity";
import styles from "./AboutMe.module.css";

export type AboutMeProps = {
  className?: string;
  weeklyActivities: WeeklyActivity[];
};

export const AboutMe: React.FC<AboutMeProps> = (props: AboutMeProps) => {
  const { className, weeklyActivities } = props;
  const isMobile = useMobileScreen();

  return (
    <section className={className}>
      {isMobile && <SocialMediaButtons />}
      <h1>Commits {new Date().getFullYear()}</h1>
      <CommitChart weeklyActivities={weeklyActivities} />
    </section>
  );
};
