"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReadmissionTrendChart from "@/components/dashboard/readmission-trend-chart"
import RiskFactorsChart from "@/components/dashboard/risk-factors-chart"
import DiagnosisDistributionChart from "@/components/dashboard/diagnosis-distribution-chart"
import DemographicsChart from "@/components/dashboard/demographics-chart"
import ModelPerformanceChart from "@/components/dashboard/model-performance-chart"
// Add error boundary to handle chart rendering errors
import { ErrorBoundary } from "react-error-boundary"

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("all")

  // Add this function inside the Dashboard component
  function ErrorFallback({ error }) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-red-500 font-medium">Error loading chart</p>
        <p className="text-sm text-gray-500 mt-1">Please try refreshing the page</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 inline-flex items-center mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Readmission Analytics Dashboard</h1>
          <p className="text-gray-500">Interactive visualization of hospital readmission data and model insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Patients</CardDescription>
            <CardTitle className="text-4xl">71,518</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-600 font-medium">↑ 2.1%</span> from previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Readmission Rate</CardDescription>
            <CardTitle className="text-4xl">18.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-red-600 font-medium">↑ 0.8%</span> from previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Length of Stay</CardDescription>
            <CardTitle className="text-4xl">4.3 days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-600 font-medium">↓ 0.5 days</span> from previous period
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="clinical">Clinical Factors</TabsTrigger>
          <TabsTrigger value="model">Model Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Readmission Trends Over Time</CardTitle>
                <CardDescription>30-day readmission rates by month</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <ReadmissionTrendChart />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Risk Factors</CardTitle>
                <CardDescription>Factors most predictive of readmission</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <RiskFactorsChart />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diagnosis Distribution</CardTitle>
                <CardDescription>Primary diagnoses with highest readmission rates</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DiagnosisDistributionChart />
                </ErrorBoundary>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Readmission by Age Group</CardTitle>
                <CardDescription>Distribution across different age ranges</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="age" />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readmission by Gender</CardTitle>
                <CardDescription>Comparison between male and female patients</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="gender" />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readmission by Race/Ethnicity</CardTitle>
                <CardDescription>Distribution across different demographic groups</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="race" />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readmission by Insurance Type</CardTitle>
                <CardDescription>Comparison across different payer categories</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="insurance" />
                </ErrorBoundary>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clinical">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Readmission by Length of Stay</CardTitle>
                <CardDescription>Impact of hospital stay duration</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="los" />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readmission by Number of Medications</CardTitle>
                <CardDescription>Effect of medication count on readmission risk</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="medications" />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readmission by Admission Type</CardTitle>
                <CardDescription>Emergency vs. planned admissions</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="admissionType" />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readmission by Comorbidity Score</CardTitle>
                <CardDescription>Impact of multiple diagnoses</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DemographicsChart type="comorbidity" />
                </ErrorBoundary>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="model">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
                <CardDescription>Accuracy, precision, recall, and F1 score across different models</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <ModelPerformanceChart />
                </ErrorBoundary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confusion Matrix</CardTitle>
                <CardDescription>True positives, false positives, true negatives, false negatives</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="grid grid-cols-2 grid-rows-2 w-full max-w-md h-full max-h-64">
                  <div className="border border-emerald-200 bg-emerald-50 flex flex-col items-center justify-center p-4">
                    <div className="text-2xl font-bold text-emerald-700">3,245</div>
                    <div className="text-xs text-gray-500 text-center">True Positive</div>
                  </div>
                  <div className="border border-red-200 bg-red-50 flex flex-col items-center justify-center p-4">
                    <div className="text-2xl font-bold text-red-700">862</div>
                    <div className="text-xs text-gray-500 text-center">False Positive</div>
                  </div>
                  <div className="border border-red-200 bg-red-50 flex flex-col items-center justify-center p-4">
                    <div className="text-2xl font-bold text-red-700">1,023</div>
                    <div className="text-xs text-gray-500 text-center">False Negative</div>
                  </div>
                  <div className="border border-emerald-200 bg-emerald-50 flex flex-col items-center justify-center p-4">
                    <div className="text-2xl font-bold text-emerald-700">14,870</div>
                    <div className="text-xs text-gray-500 text-center">True Negative</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROC Curve</CardTitle>
                <CardDescription>Receiver Operating Characteristic curve analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <div className="h-full flex items-center justify-center">
                  <img src="/placeholder.svg?height=300&width=400" alt="ROC Curve" className="max-h-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ethical Considerations</CardTitle>
          <CardDescription>Implications of false positives and negatives in healthcare</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">False Positives</h4>
              <p className="text-gray-600 mb-4">
                When a patient is incorrectly predicted to be readmitted, this may lead to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Unnecessary interventions and follow-ups</li>
                <li>Increased healthcare costs</li>
                <li>Resource allocation inefficiencies</li>
                <li>Patient anxiety and inconvenience</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">False Negatives</h4>
              <p className="text-gray-600 mb-4">
                When a high-risk patient is incorrectly predicted as low-risk, this may lead to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Missed opportunities for preventive interventions</li>
                <li>Potentially worse patient outcomes</li>
                <li>Higher emergency readmission costs</li>
                <li>Decreased trust in predictive systems</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Our Approach</h4>
            <p className="text-gray-600">
              We've carefully balanced our model to minimize both false positives and negatives, with a slight
              preference toward minimizing false negatives due to the higher potential harm. Additionally, we emphasize
              that this tool should support, not replace, clinical judgment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
