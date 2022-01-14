import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeeklyActivity } from "typings/weeklyActivity";
import styles from "./CommitChart.module.css";

export type CommitChartProps = {
  className?: string;
  weeklyActivities: WeeklyActivity[];
};

export const CommitChart: React.FC<CommitChartProps> = (
  props: CommitChartProps
) => {
  const { className, weeklyActivities } = props;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        className={`${styles.chart} ${className}`}
        width={730}
        height={250}
        data={weeklyActivities.map(({ week, activity }) => ({
          name: `Week ${week}`,
          week,
          commits: activity,
        }))}
        margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-tint)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-tint)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip
          contentStyle={{
            background: "var(--color-p-1)",
            borderColor: "var(--color-tint)",
            borderRadius: "var(--radius-1)",
          }}
        />
        <Area
          type="monotone"
          dataKey="commits"
          stroke="var(--color-tint)"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
