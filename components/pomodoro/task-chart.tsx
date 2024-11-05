"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TaskData {
  date: string;
  count: number;
}

interface TaskChartProps {
  data: TaskData[];
}

export function TaskChart({ data }: TaskChartProps) {
  return (
    <div className="p-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-muted-foreground"
              axisLine={false}
              tickLine={false}
              dy={10}
              height={60}
              tick={{ dy: 10 }}
            />
            <YAxis
              className="text-muted-foreground"
              axisLine={false}
              tickLine={false}
              dx={-10}
              width={60}
              tick={{ dx: -10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                padding: "8px 12px",
              }}
              cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTasks)"
              dot={{ stroke: "hsl(var(--chart-1))", fill: "hsl(var(--background))" }}
              activeDot={{ stroke: "hsl(var(--chart-1))", fill: "hsl(var(--chart-1))", r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}