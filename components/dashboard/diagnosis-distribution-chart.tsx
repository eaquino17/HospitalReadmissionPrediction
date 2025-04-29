"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { diagnosis: "Heart Failure", readmissionRate: 32.5 },
  { diagnosis: "COPD", readmissionRate: 28.7 },
  { diagnosis: "Renal Failure", readmissionRate: 27.3 },
  { diagnosis: "Pneumonia", readmissionRate: 22.1 },
  { diagnosis: "Diabetes", readmissionRate: 19.8 },
  { diagnosis: "Stroke", readmissionRate: 18.4 },
  { diagnosis: "Hypertension", readmissionRate: 15.2 },
]

export default function DiagnosisDistributionChart() {
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
        <BarChart data={data}>
          <XAxis dataKey="diagnosis" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="readmissionRate" fill="var(--color-readmissionRate)" radius={4} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
