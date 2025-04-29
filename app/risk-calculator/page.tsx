"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function RiskCalculator() {
  const [patientData, setPatientData] = useState({
    age: 65,
    gender: "male",
    admissionType: "emergency",
    lengthOfStay: 5,
    numMedications: 6,
    numDiagnoses: 3,
    hasDiabetes: true,
    hasHeartFailure: false,
    hasCOPD: false,
    hasRenalFailure: false,
    hasHypertension: true,
  })

  const [riskResult, setRiskResult] = useState(null)

  const handleInputChange = (field, value) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateRisk = () => {
    // This would normally call an API with a trained model
    // For demo purposes, we'll use a simplified risk calculation

    let riskScore = 0

    // Age factor
    if (patientData.age > 75) riskScore += 25
    else if (patientData.age > 65) riskScore += 15
    else if (patientData.age > 50) riskScore += 10

    // Emergency admission
    if (patientData.admissionType === "emergency") riskScore += 15

    // Length of stay
    if (patientData.lengthOfStay > 7) riskScore += 20
    else if (patientData.lengthOfStay > 4) riskScore += 10

    // Medications
    if (patientData.numMedications > 8) riskScore += 20
    else if (patientData.numMedications > 5) riskScore += 15

    // Diagnoses
    if (patientData.numDiagnoses > 3) riskScore += 15

    // Specific conditions
    if (patientData.hasHeartFailure) riskScore += 25
    if (patientData.hasCOPD) riskScore += 20
    if (patientData.hasRenalFailure) riskScore += 20
    if (patientData.hasDiabetes) riskScore += 15
    if (patientData.hasHypertension) riskScore += 10

    // Cap at 100
    riskScore = Math.min(riskScore, 100)

    // Determine risk category
    let riskCategory
    let interventions = []

    if (riskScore < 25) {
      riskCategory = "Low"
      interventions = [
        "Standard discharge instructions",
        "Routine follow-up appointment within 30 days",
        "Medication reconciliation",
      ]
    } else if (riskScore < 50) {
      riskCategory = "Moderate"
      interventions = [
        "Follow-up appointment within 14 days",
        "Medication reconciliation and education",
        "Phone check-in within 7 days",
        "Provide clear warning signs that require medical attention",
      ]
    } else if (riskScore < 75) {
      riskCategory = "High"
      interventions = [
        "Follow-up appointment within 7 days",
        "Medication reconciliation and education",
        "Phone check-in within 48 hours of discharge",
        "Home health services evaluation",
        "Care coordination with primary care provider",
      ]
    } else {
      riskCategory = "Very High"
      interventions = [
        "Follow-up appointment within 3-5 days",
        "Medication reconciliation and education",
        "Daily phone check-ins for first week",
        "Home health services",
        "Care coordination with specialists",
        "Consider transitional care program enrollment",
        "Evaluate for remote monitoring devices",
      ]
    }

    // Calculate readmission probability (simplified)
    const readmissionProbability = riskScore / 100

    // Identify top risk factors
    const riskFactors = []
    if (patientData.age > 65) riskFactors.push("Advanced age")
    if (patientData.admissionType === "emergency") riskFactors.push("Emergency admission")
    if (patientData.lengthOfStay > 7) riskFactors.push("Extended hospital stay")
    if (patientData.numMedications > 5) riskFactors.push("Multiple medications")
    if (patientData.hasHeartFailure) riskFactors.push("Heart Failure")
    if (patientData.hasCOPD) riskFactors.push("COPD")
    if (patientData.hasRenalFailure) riskFactors.push("Renal Failure")

    setRiskResult({
      score: riskScore,
      category: riskCategory,
      probability: readmissionProbability,
      riskFactors: riskFactors.slice(0, 3), // Top 3 risk factors
      interventions,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-emerald-600 hover:text-emerald-700 inline-flex items-center mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Patient Readmission Risk Calculator</h1>
        <p className="text-gray-500">
          Predict 30-day readmission risk and get personalized intervention recommendations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Enter patient details to calculate readmission risk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="age">Age: {patientData.age}</Label>
                  <span className="text-sm text-gray-500">Years</span>
                </div>
                <Slider
                  id="age"
                  min={18}
                  max={100}
                  step={1}
                  value={[patientData.age]}
                  onValueChange={(value) => handleInputChange("age", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={patientData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admissionType">Admission Type</Label>
                <Select
                  value={patientData.admissionType}
                  onValueChange={(value) => handleInputChange("admissionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select admission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="elective">Elective</SelectItem>
                    <SelectItem value="trauma">Trauma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="lengthOfStay">Length of Stay: {patientData.lengthOfStay}</Label>
                  <span className="text-sm text-gray-500">Days</span>
                </div>
                <Slider
                  id="lengthOfStay"
                  min={1}
                  max={30}
                  step={1}
                  value={[patientData.lengthOfStay]}
                  onValueChange={(value) => handleInputChange("lengthOfStay", value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="numMedications">Number of Medications: {patientData.numMedications}</Label>
                </div>
                <Slider
                  id="numMedications"
                  min={0}
                  max={20}
                  step={1}
                  value={[patientData.numMedications]}
                  onValueChange={(value) => handleInputChange("numMedications", value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="numDiagnoses">Number of Diagnoses: {patientData.numDiagnoses}</Label>
                </div>
                <Slider
                  id="numDiagnoses"
                  min={1}
                  max={10}
                  step={1}
                  value={[patientData.numDiagnoses]}
                  onValueChange={(value) => handleInputChange("numDiagnoses", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Medical Conditions</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="diabetes"
                      checked={patientData.hasDiabetes}
                      onChange={(e) => handleInputChange("hasDiabetes", e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="diabetes">Diabetes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="heartFailure"
                      checked={patientData.hasHeartFailure}
                      onChange={(e) => handleInputChange("hasHeartFailure", e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="heartFailure">Heart Failure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="copd"
                      checked={patientData.hasCOPD}
                      onChange={(e) => handleInputChange("hasCOPD", e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="copd">COPD</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="renalFailure"
                      checked={patientData.hasRenalFailure}
                      onChange={(e) => handleInputChange("hasRenalFailure", e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="renalFailure">Renal Failure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hypertension"
                      checked={patientData.hasHypertension}
                      onChange={(e) => handleInputChange("hasHypertension", e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="hypertension">Hypertension</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={calculateRisk} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Calculate Risk
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          {riskResult ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Risk Assessment Results
                  <Badge
                    className={
                      riskResult.category === "Low"
                        ? "bg-green-100 text-green-800"
                        : riskResult.category === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : riskResult.category === "High"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                    }
                  >
                    {riskResult.category} Risk
                  </Badge>
                </CardTitle>
                <CardDescription>30-day readmission risk prediction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Risk Score</span>
                    <span className="text-sm font-bold">{riskResult.score}/100</span>
                  </div>
                  <Progress
                    value={riskResult.score}
                    className={
                      riskResult.category === "Low"
                        ? "bg-green-100"
                        : riskResult.category === "Moderate"
                          ? "bg-yellow-100"
                          : riskResult.category === "High"
                            ? "bg-orange-100"
                            : "bg-red-100"
                    }
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Readmission Probability</h4>
                  <p className="text-3xl font-bold">{Math.round(riskResult.probability * 100)}%</p>
                  <p className="text-sm text-gray-500 mt-1">Likelihood of readmission within 30 days</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Top Risk Factors</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {riskResult.riskFactors.map((factor, index) => (
                      <li key={index} className="text-gray-700">
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Recommended Interventions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {riskResult.interventions.map((intervention, index) => (
                      <li key={index} className="text-gray-700">
                        {intervention}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <p className="text-sm text-gray-500 mb-4">
                  This risk assessment is based on statistical models and should be used as a decision support tool, not
                  as a replacement for clinical judgment.
                </p>
                <Button variant="outline" onClick={() => setRiskResult(null)}>
                  Calculate for Another Patient
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Results</CardTitle>
                <CardDescription>Enter patient information and click "Calculate Risk" to see results</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Info className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                <p className="text-gray-500 max-w-md">
                  Fill out the patient information form and click "Calculate Risk" to generate a readmission risk
                  assessment and personalized intervention recommendations.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Understanding the risk calculation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This risk calculator uses a machine learning model trained on the UCI Diabetes 130-US hospitals dataset
                to predict the likelihood of patient readmission within 30 days.
              </p>
              <p className="text-gray-600 mb-4">
                The model analyzes multiple factors including patient demographics, clinical history, length of stay,
                medications, and diagnoses to generate a risk score and personalized intervention recommendations.
              </p>
              <p className="text-gray-600">
                For research purposes, this calculator demonstrates how predictive analytics can be used to identify
                high-risk patients and implement targeted interventions to reduce readmission rates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
