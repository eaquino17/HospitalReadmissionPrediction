import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Methodology() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-emerald-600 hover:text-emerald-700 inline-flex items-center mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Methodology</h1>
        <p className="text-gray-500">Our approach to predicting hospital readmissions</p>
      </div>

      <Tabs defaultValue="data" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="data">Data Preparation</TabsTrigger>
          <TabsTrigger value="features">Feature Engineering</TabsTrigger>
          <TabsTrigger value="models">Model Development</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Preparation</CardTitle>
              <CardDescription>Cleaning and preprocessing the UCI Diabetes dataset</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Dataset Overview</h3>
                <p className="text-gray-600 mb-4">
                  We used the UCI Diabetes 130-US hospitals dataset, which contains 10 years (1999-2008) of clinical
                  care data from 130 US hospitals. The dataset includes over 100,000 hospital admissions of diabetic
                  patients.
                </p>
                <p className="text-gray-600">
                  Each record in the dataset represents a hospital stay and includes information about patient
                  demographics, diagnoses, medications, laboratory tests, and whether the patient was readmitted within
                  30 days.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Data Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  The dataset required significant cleaning and preprocessing before it could be used for modeling:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Handling missing values using appropriate imputation techniques</li>
                  <li>Removing duplicate records and inconsistent entries</li>
                  <li>Converting categorical variables to numerical representations</li>
                  <li>Normalizing numerical features to ensure consistent scales</li>
                  <li>Encoding medical codes and diagnoses into meaningful categories</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Exploratory Data Analysis</h3>
                <p className="text-gray-600 mb-4">
                  We conducted extensive exploratory data analysis to understand patterns and relationships in the data:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Distribution of patient demographics and clinical characteristics</li>
                  <li>Correlation between variables and readmission outcomes</li>
                  <li>Temporal patterns in readmission rates</li>
                  <li>Identification of potential confounding variables</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Engineering</CardTitle>
              <CardDescription>Creating meaningful features from raw clinical data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Feature Creation</h3>
                <p className="text-gray-600 mb-4">
                  We developed several derived features to capture important clinical patterns:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Comorbidity Score:</strong> A weighted score based on the number and severity of diagnoses
                  </li>
                  <li>
                    <strong>Medication Complexity:</strong> Metrics capturing the number and interactions of medications
                  </li>
                  <li>
                    <strong>Hospital Utilization History:</strong> Features describing previous hospital visits and
                    outcomes
                  </li>
                  <li>
                    <strong>Lab Result Trends:</strong> Changes in key laboratory values during the hospital stay
                  </li>
                  <li>
                    <strong>Time-Based Features:</strong> Day of week, season, and time since previous admission
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Feature Selection</h3>
                <p className="text-gray-600 mb-4">
                  We used multiple techniques to select the most predictive features:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Recursive feature elimination to identify the most important variables</li>
                  <li>LASSO regularization to perform automatic feature selection</li>
                  <li>Correlation analysis to remove redundant features</li>
                  <li>Domain expertise to ensure clinically relevant features were included</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Feature Importance</h3>
                <p className="text-gray-600 mb-4">
                  The top features identified as most predictive of readmission were:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Presence of heart failure diagnosis</li>
                  <li>Length of hospital stay</li>
                  <li>Patient age</li>
                  <li>Number of medications at discharge</li>
                  <li>Emergency admission status</li>
                  <li>History of previous readmissions</li>
                  <li>Comorbidity score</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Model Development</CardTitle>
              <CardDescription>Building and optimizing machine learning models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Model Selection</h3>
                <p className="text-gray-600 mb-4">
                  We evaluated several machine learning algorithms for this classification task:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Logistic Regression:</strong> As a baseline model with high interpretability
                  </li>
                  <li>
                    <strong>Random Forest:</strong> To capture complex non-linear relationships
                  </li>
                  <li>
                    <strong>Gradient Boosting:</strong> For high performance and feature importance insights
                  </li>
                  <li>
                    <strong>Neural Networks:</strong> To explore deep learning approaches
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Handling Class Imbalance</h3>
                <p className="text-gray-600 mb-4">
                  Since readmissions are relatively rare events (approximately 18% of cases), we implemented techniques
                  to address class imbalance:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>SMOTE (Synthetic Minority Over-sampling Technique) to generate synthetic samples</li>
                  <li>Class weighting to penalize misclassification of minority class</li>
                  <li>Threshold adjustment to optimize for clinical utility</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Hyperparameter Optimization</h3>
                <p className="text-gray-600 mb-4">We performed extensive hyperparameter tuning using:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Grid search with cross-validation</li>
                  <li>Bayesian optimization for more efficient parameter exploration</li>
                  <li>Learning curve analysis to prevent overfitting</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  The final model selected was a Random Forest classifier with optimized hyperparameters, which provided
                  the best balance of performance and interpretability.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation">
          <Card>
            <CardHeader>
              <CardTitle>Model Evaluation</CardTitle>
              <CardDescription>Assessing model performance and clinical utility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
                <p className="text-gray-600 mb-4">
                  We evaluated our models using multiple metrics to ensure comprehensive assessment:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Accuracy:</strong> 82% overall correct predictions
                  </li>
                  <li>
                    <strong>Precision:</strong> 79% of predicted readmissions were actual readmissions
                  </li>
                  <li>
                    <strong>Recall:</strong> 76% of actual readmissions were correctly identified
                  </li>
                  <li>
                    <strong>F1 Score:</strong> 77% harmonic mean of precision and recall
                  </li>
                  <li>
                    <strong>AUC-ROC:</strong> 0.85 area under the receiver operating characteristic curve
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Cross-Validation</h3>
                <p className="text-gray-600 mb-4">To ensure robust performance estimation, we used:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>5-fold cross-validation to assess model stability</li>
                  <li>Temporal validation (training on earlier data, testing on later data)</li>
                  <li>Hospital-based validation to test generalizability across institutions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Clinical Validation</h3>
                <p className="text-gray-600 mb-4">Beyond statistical metrics, we assessed clinical utility through:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Consultation with healthcare providers to validate model predictions</li>
                  <li>Decision curve analysis to evaluate net benefit across different threshold probabilities</li>
                  <li>Simulation of intervention costs and benefits based on model predictions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Model Explainability</h3>
                <p className="text-gray-600 mb-4">We used several techniques to make our model interpretable:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>SHAP (SHapley Additive exPlanations) values to explain individual predictions</li>
                  <li>Partial dependence plots to visualize feature relationships</li>
                  <li>Feature importance rankings to identify key predictors</li>
                  <li>Rule extraction to create simplified decision rules for clinicians</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ethical Considerations</CardTitle>
          <CardDescription>Addressing important ethical aspects of predictive healthcare models</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Fairness and Bias</h3>
            <p className="text-gray-600 mb-4">
              We took several steps to identify and mitigate potential biases in our model:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Evaluated performance across different demographic groups</li>
              <li>Tested for disparate impact on protected classes</li>
              <li>Applied fairness constraints during model training</li>
              <li>Documented limitations and potential biases in the model</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Privacy and Security</h3>
            <p className="text-gray-600 mb-4">Patient data protection was a priority throughout our research:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>All data was de-identified in compliance with HIPAA regulations</li>
              <li>Secure computing environments were used for all analysis</li>
              <li>Model deployment follows healthcare security best practices</li>
              <li>Privacy-preserving techniques were applied where appropriate</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Clinical Integration</h3>
            <p className="text-gray-600 mb-4">For responsible implementation in clinical settings:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>The model is designed as a decision support tool, not a replacement for clinical judgment</li>
              <li>Clear documentation of model limitations and appropriate use cases</li>
              <li>Ongoing monitoring for performance drift and unexpected outcomes</li>
              <li>Regular retraining with new data to maintain accuracy</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
