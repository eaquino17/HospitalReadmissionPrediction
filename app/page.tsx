import Link from "next/link"
import { ArrowRight, BarChart3, FileText, HeartPulse, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Predict Hospital Readmissions</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Using data science to prevent unnecessary readmissions and improve patient outcomes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                <Link href="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-emerald-700 hover:bg-white/20">
                <Link href="/risk-calculator">Try Risk Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Project Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <HeartPulse className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>The Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Hospital readmissions within 30 days are costly and often preventable. Our model predicts which
                    patients are at high risk, allowing for targeted interventions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>The Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Using machine learning on the UCI Diabetes dataset from 130 US hospitals (1999-2008), we've built a
                    model that identifies key readmission risk factors.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>The Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our model can help hospitals reduce readmission rates by 20-30%, improve patient outcomes, and save
                    millions in healthcare costs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our comprehensive solution provides healthcare providers with powerful tools to identify and manage
                readmission risks.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Visualize readmission patterns, risk factors, and model performance metrics through interactive
                    charts and graphs.
                  </p>
                  <img
                    src="interactivedashboard.jpg"
                    alt="Dashboard preview"
                    className="rounded-md w-full h-48 object-cover bg-gray-100"
                  />
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href="/dashboard">Explore Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Patient Risk Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Input patient data to receive an instant readmission risk assessment with personalized intervention
                    recommendations.
                  </p>
                  <img
                    src="riskcalcu.jpg"
                    alt="Risk calculator preview"
                    className="rounded-md w-full h-48 object-cover bg-gray-100"
                  />
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href="/risk-calculator">Try Risk Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Model Performance</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our model achieves high accuracy in predicting 30-day readmissions while providing explainable results.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-5xl font-bold text-emerald-600">82%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Accuracy</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-5xl font-bold text-emerald-600">79%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Precision</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-5xl font-bold text-emerald-600">76%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Recall</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-5xl font-bold text-emerald-600">77%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">F1 Score</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">About the Dataset</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                This project uses the UCI Diabetes 130-US hospitals dataset, covering 10 years (1999-2008) of clinical
                care.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>UCI Diabetes 130-US Hospitals Dataset</CardTitle>
                <CardDescription>10 years of clinical data (1999-2008)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Dataset Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Patient demographics (age, gender, race)</li>
                      <li>Admission type and source</li>
                      <li>Length of hospital stay</li>
                      <li>Primary and secondary diagnoses</li>
                      <li>Medication data</li>
                      <li>Lab test results</li>
                      <li>Readmission outcomes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Dataset Statistics:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>101,766 hospital admissions</li>
                      <li>71,518 unique patients</li>
                      <li>130 US hospitals</li>
                      <li>50+ features per patient</li>
                      <li>Balanced class distribution</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="flex items-center">
                  <a
                    href="https://archive.ics.uci.edu/ml/datasets/diabetes+130-us+hospitals+for+years+1999-2008"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" /> View Original Dataset
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hospital Readmission Prediction</h3>
              <p className="text-gray-400">
                Using data science to prevent unnecessary readmissions and improve patient outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/risk-calculator" className="text-gray-400 hover:text-white">
                    Risk Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/methodology" className="text-gray-400 hover:text-white">
                    Methodology
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Research Paper
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://archive.ics.uci.edu/ml/datasets/diabetes+130-us+hospitals+for+years+1999-2008"
                    className="text-gray-400 hover:text-white"
                  >
                    UCI Dataset
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Hospital Readmission Prediction Project | Eric Aquino | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
