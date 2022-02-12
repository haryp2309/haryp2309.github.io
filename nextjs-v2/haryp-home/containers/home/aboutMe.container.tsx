import { SkillsAndTechnologies } from "components/skillsAndTechnologies/skillsAndTechnologies";
import { useMobileScreen } from "hooks/mobileScreen";
import { useLocale } from "hooks/useLocale";
import { FILEPATH as ProfilePictureUrl } from "pages/api/pb";
import { WeeklyActivity } from "typings/weeklyActivity";
import s from "./AboutMe.module.css";

export type AboutMeProps = {
  className?: string;
  weeklyActivities: WeeklyActivity[];
};

export const AboutMe: React.FC<AboutMeProps> = (props: AboutMeProps) => {
  const { className } = props;

  const { t } = useLocale();
  const isMobile = useMobileScreen();

  return (
    <section className={className}>
      <div className={s.container}>
        <div className={s["left-column"]}>
          <h1>{t("hiThere")}</h1>
          <p>{t("aboutMe")}</p>
          <SkillsAndTechnologies />
        </div>
        {!isMobile && (
          <div className={s["right-column"]}>
            <div className={s["pb-container"]}>
              <div className={s["pb-outer-bg"]} />
              <img src={ProfilePictureUrl} className={s.pb} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
