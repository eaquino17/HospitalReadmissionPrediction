"use client"

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const ageData = [
  { group: "18-30", readmissionRate: 8.2 },
  { group: "31-45", readmissionRate: 12.5 },
  { group: "46-60", readmissionRate: 17.8 },
  { group: "61-75", readmissionRate: 24.3 },
  { group: "76+", readmissionRate: 32.7 },
]

const genderData = [
  { name: "Male", value: 19.2 },
  { name: "Female", value: 17.3 },
]

const raceData = [
  { group: "Caucasian", readmissionRate: 17.5 },
  { group: "African American", readmissionRate: 21.3 },
  { group: "Hispanic", readmissionRate: 18.7 },
  { group: "Asian", readmissionRate: 15.2 },
  { group: "Other", readmissionRate: 19.1 },
]

const insuranceData = [
  { group: "Medicare", readmissionRate: 23.5 },
  { group: "Medicaid", readmissionRate: 19.8 },
  { group: "Private", readmissionRate: 14.2 },
  { group: "Self-pay", readmissionRate: 17.3 },
  { group: "Other", readmissionRate: 18.9 },
]

const losData = [
  { group: "1-2 days", readmissionRate: 12.3 },
  { group: "3-5 days", readmissionRate: 17.8 },
  { group: "6-10 days", readmissionRate: 24.5 },
  { group: "11+ days", readmissionRate: 32.1 },
]

const medicationsData = [
  { group: "0-2", readmissionRate: 10.2 },
  { group: "3-5", readmissionRate: 15.7 },
  { group: "6-8", readmissionRate: 21.3 },
  { group: "9+", readmissionRate: 28.9 },
]

const admissionTypeData = [
  { group: "Emergency", readmissionRate: 24.7 },
  { group: "Urgent", readmissionRate: 18.3 },
  { group: "Elective", readmissionRate: 12.1 },
  { group: "Trauma", readmissionRate: 22.5 },
]

const comorbidityData = [
  { group: "0", readmissionRate: 8.3 },
  { group: "1", readmissionRate: 14.7 },
  { group: "2", readmissionRate: 21.2 },
  { group: "3+", readmissionRate: 32.8 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function DemographicsChart({ type }) {
  let data
  let chartType = "bar"

  switch (type) {
    case "age":
      data = ageData
      break
    case "gender":
      data = genderData
      chartType = "pie"
      break
    case "race":
      data = raceData
      break
    case "insurance":
      data = insuranceData
      break
    case "los":
      data = losData
      break
    case "medications":
      data = medicationsData
      break
    case "admissionType":
      data = admissionTypeData
      break
    case "comorbidity":
      data = comorbidityData
      break
    default:
      // Provide a fallback to prevent undefined data
      data = ageData
      break
  }

  // Add a safety check to ensure data is always defined
  if (!data) {
    data = []
    console.error(`No data available for type: ${type}`)
  }

  if (chartType === "pie") {
    return (
      <ChartContainer className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip formatter={(value) => [`${value}%`, "Readmission Rate"]} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

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
          <XAxis dataKey="group" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
