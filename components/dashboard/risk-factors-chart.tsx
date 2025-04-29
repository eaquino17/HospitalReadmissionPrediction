"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { factor: "Heart Failure", importance: 0.24 },
  { factor: "Length of Stay", importance: 0.18 },
  { factor: "Age", importance: 0.15 },
  { factor: "COPD", importance: 0.14 },
  { factor: "Emergency Admission", importance: 0.12 },
  { factor: "Medication Count", importance: 0.09 },
  { factor: "Renal Failure", importance: 0.08 },
]

export default function RiskFactorsChart() {
  return (
    <ChartContainer
      config={{
        importance: {
          label: "Importance",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            domain={[0, 0.3]}
          />
          <YAxis dataKey="factor" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="importance" fill="var(--color-importance)" radius={4} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
