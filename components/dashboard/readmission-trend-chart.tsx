"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", readmissionRate: 18.2 },
  { month: "Feb", readmissionRate: 17.8 },
  { month: "Mar", readmissionRate: 17.5 },
  { month: "Apr", readmissionRate: 18.1 },
  { month: "May", readmissionRate: 18.7 },
  { month: "Jun", readmissionRate: 19.2 },
  { month: "Jul", readmissionRate: 19.5 },
  { month: "Aug", readmissionRate: 18.9 },
  { month: "Sep", readmissionRate: 18.4 },
  { month: "Oct", readmissionRate: 18.0 },
  { month: "Nov", readmissionRate: 17.6 },
  { month: "Dec", readmissionRate: 18.2 },
]

export default function ReadmissionTrendChart() {
  return (
    <ChartContainer
      config={{
        readmissionRate: {
          label: "Readmission Rate (%)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[16, 20]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="readmissionRate"
            strokeWidth={2}
            activeDot={{ r: 6, style: { fill: "var(--color-readmissionRate)" } }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
