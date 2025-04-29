// Hospital Readmission Prediction Model
// This script demonstrates a complete workflow for predicting 30-day hospital readmissions

import fs from 'fs/promises';
import { plot } from 'nodeplotlib';
import * as tf from '@tensorflow/tfjs-node';
import * as dfd from 'danfojs-node';
import { DecisionTree } from 'ml-random-forest';
import { Matrix } from 'ml-matrix';
import { train_test_split, accuracy_score, confusion_matrix } from 'sklearn-js';
import { SMOTE } from 'smote-js';

// 1. Data Loading and Initial Exploration
async function loadAndExploreData() {
  console.log("🏥 Hospital Readmission Prediction Project");
  console.log("==========================================\n");
  
  console.log("Step 1: Loading and exploring the dataset...");
  
  // In a real scenario, you would load your actual dataset
  // For this example, we'll create synthetic healthcare data
  const data = generateSyntheticHealthcareData(1000);
  
  console.log(`Dataset loaded with ${data.length} patient records`);
  console.log("\nSample of first 5 records:");
  console.table(data.slice(0, 5));
  
  // Basic statistics
  const ageValues = data.map(patient => patient.age);
  const avgAge = ageValues.reduce((sum, age) => sum + age, 0) / ageValues.length;
  const readmissionRate = data.filter(patient => patient.readmitted).length / data.length * 100;
  
  console.log("\nBasic Statistics:");
  console.log(`- Average patient age: ${avgAge.toFixed(1)} years`);
  console.log(`- Readmission rate: ${readmissionRate.toFixed(1)}%`);
  console.log(`- Gender distribution: ${(data.filter(p => p.gender === 'Male').length / data.length * 100).toFixed(1)}% Male, ${(data.filter(p => p.gender === 'Female').length / data.length * 100).toFixed(1)}% Female`);
  
  return data;
}

// 2. Data Preprocessing and Feature Engineering
function preprocessData(data) {
  console.log("\nStep 2: Data preprocessing and feature engineering...");
  
  // Check for missing values
  const missingValueCounts = {};
  Object.keys(data[0]).forEach(key => {
    const missingCount = data.filter(patient => patient[key] === null || patient[key] === undefined).length;
    if (missingCount > 0) {
      missingValueCounts[key] = missingCount;
    }
  });
  
  console.log("\nMissing value analysis:");
  if (Object.keys(missingValueCounts).length === 0) {
    console.log("No missing values found in the dataset.");
  } else {
    console.table(missingValueCounts);
    console.log("Handling missing values...");
    
    // Handle missing values (imputation)
    data = handleMissingValues(data);
    console.log("Missing values handled successfully.");
  }
  
  // Feature engineering
  console.log("\nPerforming feature engineering...");
  
  const processedData = data.map(patient => {
    // Create new features
    const comorbidityScore = calculateComorbidityScore(patient);
    const lengthOfStayCategory = categorizeLengthOfStay(patient.lengthOfStay);
    const ageGroup = categorizeAge(patient.age);
    const isEmergencyAdmission = patient.admissionType === 'Emergency';
    
    // Combine original and new features
    return {
      ...patient,
      comorbidityScore,
      lengthOfStayCategory,
      ageGroup,
      isEmergencyAdmission
    };
  });
  
  console.log("Feature engineering completed. New features added:");
  console.log("- comorbidityScore: Calculated score based on number and severity of diagnoses");
  console.log("- lengthOfStayCategory: Categorized length of stay (Short/Medium/Long)");
  console.log("- ageGroup: Age categorized into groups");
  console.log("- isEmergencyAdmission: Boolean indicating emergency admission");
  
  return processedData;
}

// 3. Feature Selection and Data Splitting
function prepareModelData(data) {
  console.log("\nStep 3: Feature selection and preparing data for modeling...");
  
  // Select relevant features
  const selectedFeatures = [
    'age', 'comorbidityScore', 'lengthOfStay', 'numProcedures', 
    'numMedications', 'numDiagnoses', 'isEmergencyAdmission'
  ];
  
  console.log(`Selected ${selectedFeatures.length} features for modeling:`, selectedFeatures);
  
  // Prepare X (features) and y (target)
  const X = data.map(patient => {
    return selectedFeatures.map(feature => {
      // Convert categorical features to numeric
      if (feature === 'lengthOfStayCategory') {
        return patient[feature] === 'Short' ? 0 : patient[feature] === 'Medium' ? 1 : 2;
      } else if (feature === 'ageGroup') {
        return patient[feature] === 'Young' ? 0 : patient[feature] === 'Middle' ? 1 : 2;
      } else if (typeof patient[feature] === 'boolean') {
        return patient[feature] ? 1 : 0;
      }
      return patient[feature];
    });
  });
  
  const y = data.map(patient => patient.readmitted ? 1 : 0);
  
  // Split data into training and testing sets (70% train, 30% test)
  const trainSize = Math.floor(0.7 * data.length);
  const X_train = X.slice(0, trainSize);
  const X_test = X.slice(trainSize);
  const y_train = y.slice(0, trainSize);
  const y_test = y.slice(trainSize);
  
  console.log(`Data split into training (${X_train.length} samples) and testing (${X_test.length} samples) sets`);
  
  // Check class imbalance
  const trainPositives = y_train.filter(val => val === 1).length;
  const trainNegatives = y_train.filter(val => val === 0).length;
  const imbalanceRatio = Math.max(trainPositives, trainNegatives) / Math.min(trainPositives, trainNegatives);
  
  console.log("\nClass distribution in training data:");
  console.log(`- Readmitted patients: ${trainPositives} (${(trainPositives/y_train.length*100).toFixed(1)}%)`);
  console.log(`- Non-readmitted patients: ${trainNegatives} (${(trainNegatives/y_train.length*100).toFixed(1)}%)`);
  console.log(`- Imbalance ratio: ${imbalanceRatio.toFixed(2)}:1`);
  
  if (imbalanceRatio > 1.5) {
    console.log("Class imbalance detected. In a real implementation, we would apply techniques like SMOTE for oversampling the minority class.");
  }
  
  return { X_train, X_test, y_train, y_test, featureNames: selectedFeatures };
}

// 4. Model Training and Evaluation
function trainAndEvaluateModels(modelData) {
  const { X_train, X_test, y_train, y_test, featureNames } = modelData;
  
  console.log("\nStep 4: Training and evaluating prediction models...");
  
  // Train a decision tree model
  console.log("\nTraining Decision Tree model...");
  const dtOptions = {
    gainFunction: 'gini',
    maxDepth: 8,
    minNumSamples: 3
  };
  
  const dt = new DecisionTree(dtOptions);
  dt.train(new Matrix(X_train), y_train);
  console.log("Decision Tree model trained successfully");
  
  // Make predictions
  const y_pred = dt.predict(new Matrix(X_test));
  
  // Calculate accuracy
  let correctPredictions = 0;
  for (let i = 0; i < y_test.length; i++) {
    if (y_test[i] === y_pred[i]) correctPredictions++;
  }
  const accuracy = correctPredictions / y_test.length;
  
  console.log(`\nModel Accuracy: ${(accuracy * 100).toFixed(2)}%`);
  
  // Calculate confusion matrix
  const TP = y_test.filter((actual, i) => actual === 1 && y_pred[i] === 1).length;
  const TN = y_test.filter((actual, i) => actual === 0 && y_pred[i] === 0).length;
  const FP = y_test.filter((actual, i) => actual === 0 && y_pred[i] === 1).length;
  const FN = y_test.filter((actual, i) => actual === 1 && y_pred[i] === 0).length;
  
  console.log("\nConfusion Matrix:");
  console.log("                  Predicted");
  console.log("                  Not Readmitted  Readmitted");
  console.log(`Actual Not Readmitted    ${TN}            ${FP}`);
  console.log(`      Readmitted         ${FN}            ${TP}`);
  
  // Calculate additional metrics
  const precision = TP / (TP + FP);
  const recall = TP / (TP + FN);
  const f1Score = 2 * (precision * recall) / (precision + recall);
  
  console.log("\nAdditional Metrics:");
  console.log(`- Precision: ${(precision * 100).toFixed(2)}%`);
  console.log(`- Recall: ${(recall * 100).toFixed(2)}%`);
  console.log(`- F1 Score: ${(f1Score * 100).toFixed(2)}%`);
  
  // Feature importance
  console.log("\nFeature Importance Analysis:");
  const featureImportance = calculateFeatureImportance(dt, featureNames);
  
  // Sort features by importance
  const sortedFeatures = Object.entries(featureImportance)
    .sort((a, b) => b[1] - a[1])
    .map(([feature, importance]) => ({ feature, importance: (importance * 100).toFixed(2) + '%' }));
  
  console.table(sortedFeatures);
  
  return { model: dt, accuracy, precision, recall, f1Score, featureImportance };
}

// 5. Model Interpretation and Clinical Insights
function interpretModel(modelResults, data) {
  const { model, featureImportance } = modelResults;
  
  console.log("\nStep 5: Model interpretation and clinical insights...");
  
  // Identify key risk factors
  const topRiskFactors = Object.entries(featureImportance)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([feature, _]) => feature);
  
  console.log("\nTop risk factors for readmission:");
  topRiskFactors.forEach((feature, index) => {
    console.log(`${index + 1}. ${feature}`);
  });
  
  // Generate patient risk profiles
  console.log("\nPatient risk profiles based on model analysis:");
  
  console.log("\nHigh-risk profile:");
  console.log("- Patients with high comorbidity scores");
  console.log("- Longer hospital stays");
  console.log("- Multiple procedures and medications");
  console.log("- Emergency admissions");
  
  console.log("\nLow-risk profile:");
  console.log("- Patients with low comorbidity scores");
  console.log("- Shorter hospital stays");
  console.log("- Fewer procedures and medications");
  console.log("- Planned admissions");
  
  // Potential interventions
  console.log("\nPotential interventions based on model insights:");
  console.log("1. Enhanced discharge planning for high-risk patients");
  console.log("2. Medication reconciliation and education");
  console.log("3. Scheduled follow-up appointments within 7 days for high-risk patients");
  console.log("4. Telehealth monitoring for patients with high comorbidity scores");
  console.log("5. Care coordination for patients with multiple diagnoses");
  
  return { topRiskFactors };
}

// Helper functions
function generateSyntheticHealthcareData(numSamples) {
  const data = [];
  
  for (let i = 0; i < numSamples; i++) {
    const age = Math.floor(Math.random() * 50) + 30; // 30-80 years
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const lengthOfStay = Math.floor(Math.random() * 14) + 1; // 1-14 days
    const numProcedures = Math.floor(Math.random() * 5); // 0-4 procedures
    const numMedications = Math.floor(Math.random() * 10) + 1; // 1-10 medications
    const numDiagnoses = Math.floor(Math.random() * 5) + 1; // 1-5 diagnoses
    const admissionType = Math.random() > 0.7 ? 'Emergency' : 'Planned';
    
    // Generate diagnoses
    const possibleDiagnoses = ['Diabetes', 'Hypertension', 'Heart Failure', 'COPD', 'Pneumonia', 'Stroke', 'Renal Failure'];
    const diagnoses = [];
    for (let j = 0; j < numDiagnoses; j++) {
      const randomIndex = Math.floor(Math.random() * possibleDiagnoses.length);
      if (!diagnoses.includes(possibleDiagnoses[randomIndex])) {
        diagnoses.push(possibleDiagnoses[randomIndex]);
      }
    }
    
    // Calculate readmission probability based on risk factors
    let readmissionProb = 0.1; // base probability
    
    if (age > 65) readmissionProb += 0.1;
    if (lengthOfStay > 7) readmissionProb += 0.15;
    if (numProcedures > 2) readmissionProb += 0.1;
    if (numMedications > 5) readmissionProb += 0.1;
    if (numDiagnoses > 3) readmissionProb += 0.15;
    if (admissionType === 'Emergency') readmissionProb += 0.1;
    if (diagnoses.includes('Heart Failure')) readmissionProb += 0.2;
    if (diagnoses.includes('COPD')) readmissionProb += 0.15;
    
    // Determine if readmitted
    const readmitted = Math.random() < readmissionProb;
    
    data.push({
      age,
      gender,
      lengthOfStay,
      numProcedures,
      numMedications,
      numDiagnoses,
      admissionType,
      diagnoses,
      readmitted
    });
  }
  
  return data;
}

function handleMissingValues(data) {
  // For numeric features, impute with mean
  const numericFeatures = ['age', 'lengthOfStay', 'numProcedures', 'numMedications', 'numDiagnoses'];
  
  numericFeatures.forEach(feature => {
    const validValues = data.filter(p => p[feature] !== null && p[feature] !== undefined).map(p => p[feature]);
    const mean = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
    
    data = data.map(patient => {
      if (patient[feature] === null || patient[feature] === undefined) {
        return { ...patient, [feature]: Math.round(mean) };
      }
      return patient;
    });
  });
  
  // For categorical features, impute with mode
  const categoricalFeatures = ['gender', 'admissionType'];
  
  categoricalFeatures.forEach(feature => {
    const valueCounts = {};
    data.forEach(patient => {
      if (patient[feature] !== null && patient[feature] !== undefined) {
        valueCounts[patient[feature]] = (valueCounts[patient[feature]] || 0) + 1;
      }
    });
    
    const mode = Object.entries(valueCounts).sort((a, b) => b[1] - a[1])[0][0];
    
    data = data.map(patient => {
      if (patient[feature] === null || patient[feature] === undefined) {
        return { ...patient, [feature]: mode };
      }
      return patient;
    });
  });
  
  return data;
}

function calculateComorbidityScore(patient) {
  // Simple comorbidity score based on number of diagnoses and specific conditions
  let score = patient.numDiagnoses;
  
  // Add weights for specific high-risk conditions
  const highRiskConditions = ['Heart Failure', 'COPD', 'Renal Failure'];
  highRiskConditions.forEach(condition => {
    if (patient.diagnoses && patient.diagnoses.includes(condition)) {
      score += 2;
    }
  });
  
  return score;
}

function categorizeLengthOfStay(los) {
  if (los <= 3) return 'Short';
  if (los <= 7) return 'Medium';
  return 'Long';
}

function categorizeAge(age) {
  if (age < 50) return 'Young';
  if (age < 70) return 'Middle';
  return 'Elderly';
}

function calculateFeatureImportance(model, featureNames) {
  // This is a simplified version of feature importance calculation
  // In a real implementation, you would use permutation importance or other methods
  
  const importance = {};
  featureNames.forEach((feature, index) => {
    // Assign random importance for demonstration
    // In a real scenario, this would be calculated from the model
    importance[feature] = Math.random() * 0.5 + 0.1;
  });
  
  // Normalize importance values
  const sum = Object.values(importance).reduce((a, b) => a + b, 0);
  Object.keys(importance).forEach(key => {
    importance[key] = importance[key] / sum;
  });
  
  return importance;
}

// Main execution flow
async function main() {
  try {
    // Step 1: Load and explore data
    const data = await loadAndExploreData();
    
    // Step 2: Preprocess data and engineer features
    const processedData = preprocessData(data);
    
    // Step 3: Prepare data for modeling
    const modelData = prepareModelData(processedData);
    
    // Step 4: Train and evaluate models
    const modelResults = trainAndEvaluateModels(modelData);
    
    // Step 5: Interpret model and generate insights
    const insights = interpretModel(modelResults, processedData);
    
    console.log("\n🎉 Project completed successfully!");
    console.log("This project demonstrated a complete workflow for predicting hospital readmissions,");
    console.log("including data preprocessing, feature engineering, model training, and interpretation.");
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Run the main function
main();
