import { useMobileScreen } from "hooks/mobileScreen";
import { useEffect, useState } from "react";
import s from "./skillsAndTechnologies.module.css";

type Props = {
  className?: string;
};

export const SkillsAndTechnologies: React.FC<Props> = (props: Props) => {
  const { className } = props;

  const [terminalCommandLength, setTerminalCommandLength] = useState(0);
  const [loadingLength, setLoadingLength] = useState(0);
  const isMobile = useMobileScreen();

  const command = "cat aboutMe.json";
  const loading = "..........";

  useEffect(() => {
    if (!isMobile) {
      const delayMs = 100;
      command.split("").forEach((v, i) => {
        setTimeout(() => {
          setTerminalCommandLength(i + 1);
        }, delayMs * i);
      });
      loading.split("").forEach((v, i) => {
        setTimeout(() => {
          setLoadingLength(i + 1);
        }, delayMs * command.length + i * delayMs);
      });
      setTimeout(() => {
        setLoadingLength(loading.length + 1);
      }, delayMs * command.length + delayMs * loading.length + delayMs * 2);
    }
  }, [isMobile]);

  return (
    <div className={`${s.container} ${isMobile ? s.mobile : ""}`}>
      <div className={s["fake-system-button-group"]}>
        <div className={`${s["fake-system-button"]} ${s.red}`} />
        <div className={`${s["fake-system-button"]} ${s.yellow}`} />
        <div className={`${s["fake-system-button"]} ${s.green}`} />
      </div>
      <div>
        <span className={s["green-code"]}>{"> "}</span>
        {isMobile ? command : command.substring(0, terminalCommandLength)}{" "}
        <br />
        {loadingLength < loading.length + 1 && !isMobile ? (
          loading.substring(0, loadingLength)
        ) : (
          <>
            {"{"} <br />
            <div className={s.tabbed}>
              {
                "knownLanguages: [ Java, Python, Kotlin, JavaScript, TypeScript ],"
              }
              {isMobile && <br />}
              <br />
              {"webTechnologies: [ React, Redux, Next.JS ],"} <br />
            </div>
            {"}"} <br />
          </>
        )}
      </div>
    </div>
  );
};
