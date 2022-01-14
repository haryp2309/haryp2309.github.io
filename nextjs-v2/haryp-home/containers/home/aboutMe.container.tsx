import { CommitChart } from "components/commitChart";
import { WeeklyActivity } from "typings/weeklyActivity";

export type AboutMeProps = {
  className?: string;
  weeklyActivities: WeeklyActivity[];
};

export const AboutMe: React.FC<AboutMeProps> = (props: AboutMeProps) => {
  const { className, weeklyActivities } = props;

  return (
    <section className={className}>
      <h1>Commits {new Date().getFullYear()}</h1>
      <CommitChart weeklyActivities={weeklyActivities} />
    </section>
  );
};
