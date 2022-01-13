import styles from "./Graph.module.css";

type Point = [x: number, y: number];

export type GraphProps = {
  className?: string;
};

export const Graph: React.FC<GraphProps> = (props: GraphProps) => {
  const { className } = props;

  const MAX_HEIGHT = 100000;
  const MAX_WIDTH = 100000;
  const TOP_PADDING = 10;

  const alignPoints = (points: Point[]): Point[] => {
    const maxValueY =
      TOP_PADDING + points.map(([x, y]) => y).reduce((a, b) => (a > b ? a : b));
    const maxValueX = points
      .map(([x, y]) => x)
      .reduce((a, b) => (a > b ? a : b));

    return points.map(([x, y]) => [
      (x / maxValueX) * MAX_WIDTH,
      (y * MAX_HEIGHT) / maxValueY,
    ]);
  };

  const renderGraph = (points: Point[]) =>
    points
      .map((value, index, array) => {
        const prevValue = index > 0 ? array[index - 1] : null;

        const currentX = value[0];
        const currentY = MAX_HEIGHT - value[1];

        if (prevValue === null) {
          return `M ${currentX} ${currentY} `;
        } else {
          const prevX = prevValue[0];
          const prevY = MAX_HEIGHT - prevValue[1];
          const middleOfPrevAndCurrentX = prevX + (currentX - prevX) / 2;
          return `C ${middleOfPrevAndCurrentX} ${prevY}, ${middleOfPrevAndCurrentX} ${currentY}, ${currentX} ${currentY} `;
        }
      })
      .reduce((prev, current) => prev + current, "");

  const preAdjustedPoints: Point[] = [
    [0, 0],
    [10, 30],
    [20, 90],
    [22, 82],
    [30, 40],
    [37, 60],
    [40, 55],
    [42, 53],
    [50, 0],
  ];

  const points = alignPoints(preAdjustedPoints);
  const graphString = renderGraph(points);

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}
        className={styles.svg}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="MyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-tint)" />
            <stop offset="100%" stopColor="#00000000" />
          </linearGradient>
        </defs>
        <mask id="MyMask">
          <rect
            x="0"
            y="0"
            width={MAX_WIDTH}
            height={MAX_HEIGHT}
            fill="white"
          />
          <rect
            className={styles["mask-rect"]}
            x="0"
            y="0"
            width={MAX_WIDTH}
            height={MAX_HEIGHT}
            fill="#000000"
          />
          {/* <rect
            x="0"
            y="0"
            width={MAX_WIDTH}
            height={MAX_HEIGHT}
            fill="#000000"
          />
          <rect x="0" y="0" width={MAX_WIDTH} height={MAX_HEIGHT} fill="white">
            <animate attributeName="width" from="0" to={MAX_WIDTH} dur="0.5s" />
          </rect> */}
        </mask>
        <path
          className={styles.graph}
          d={graphString}
          id="graph"
          vectorEffect="non-scaling-stroke"
        />
        <g id="circles">
          {points.map(([x, reverseY]) => (
            <circle
              key={`${x},${reverseY}`}
              className={styles.circle}
              cx={x}
              cy={MAX_HEIGHT - reverseY}
              r="2"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
