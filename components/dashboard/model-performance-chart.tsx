"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    model: "Random Forest",
    accuracy: 0.82,
    precision: 0.79,
    recall: 0.76,
    f1Score: 0.77,
    auc: 0.85,
  },
  {
    model: "Gradient Boosting",
    accuracy: 0.8,
    precision: 0.77,
    recall: 0.75,
    f1Score: 0.76,
    auc: 0.83,
  },
  {
    model: "Logistic Regression",
    accuracy: 0.75,
    precision: 0.72,
    recall: 0.71,
    f1Score: 0.71,
    auc: 0.78,
  },
  {
    model: "Neural Network",
    accuracy: 0.79,
    precision: 0.76,
    recall: 0.74,
    f1Score: 0.75,
    auc: 0.82,
  },
]

export default function ModelPerformanceChart() {
  return (
    <ChartContainer
      config={{
        accuracy: {
          label: "Accuracy",
          color: "hsl(var(--chart-1))",
        },
        precision: {
          label: "Precision",
          color: "hsl(var(--chart-2))",
        },
        recall: {
          label: "Recall",
          color: "hsl(var(--chart-3))",
        },
        f1Score: {
          label: "F1 Score",
          color: "hsl(var(--chart-4))",
        },
        auc: {
          label: "AUC",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="model" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 1]}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="accuracy" fill="var(--color-accuracy)" radius={4} barSize={10} />
          <Bar dataKey="precision" fill="var(--color-precision)" radius={4} barSize={10} />
          <Bar dataKey="recall" fill="var(--color-recall)" radius={4} barSize={10} />
          <Bar dataKey="f1Score" fill="var(--color-f1Score)" radius={4} barSize={10} />
          <Bar dataKey="auc" fill="var(--color-auc)" radius={4} barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
