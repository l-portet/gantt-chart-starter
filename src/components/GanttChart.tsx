import React from 'react';
// import { getColorFromString } from "@parssa/universal-ui";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const DAY_WIDTH = 10;

type FormattedItem = {
  start: Date;
  end: Date;
  name: string;
};

const GanttChartItem = ({
  item,
  firstStart,
}: {
  item: FormattedItem;
  firstStart: Date;
}) => {
  const convertMsToDays = (ms: number) => Math.ceil(ms / 1000 / (3600 * 24));
  const { start, end } = item;
  const days = convertMsToDays(end.getTime() - start.getTime());
  const daysBeforeStart = convertMsToDays(
    start.getTime() - firstStart.getTime()
  );

  return (
    <div className="flex gap-2">
      <div
        className="bg-red-500"
        style={{
          width: DAY_WIDTH * days + 'px',
          height: '30px',
          marginLeft: DAY_WIDTH * daysBeforeStart + 'px',
        }}
      ></div>
      {item.name}
    </div>
  );
};

// You can use `getColorFromString` to get the colors for the Gantt Chart rows
export const GanttChart = ({
  items,
  ...props
}: DivProps & {
  items: Item[];
}) => {
  const formatted = items.map(({ name, start, end }) => ({
    name,
    start: new Date(start),
    end: new Date(end),
  }));
  const sorted = formatted.sort(
    (itemA, itemB) => itemA.start.getTime() - itemB.start.getTime()
  );
  const firstStart = sorted.at(0).start;

  return (
    <div {...props}>
      {/* Feel free to remove this */}
      <pre>{JSON.stringify(items, null, 2)}</pre>

      <div className="flex justify-start flex-col gap-2">
        {sorted.map((item, index) => (
          <GanttChartItem key={index} item={item} firstStart={firstStart} />
        ))}
      </div>
    </div>
  );
};
