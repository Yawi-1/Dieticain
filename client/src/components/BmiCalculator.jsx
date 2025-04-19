import React, { useState } from "react";
import Layout from "./Layout/Layout";
const BMICalculator = () => {
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = () => {
    if (!feet || !weight) {
      setBmiResult("⚠️ Please enter your height and weight.");
      return;
    }

    // Convert feet and inches to total inches
    const totalInches = parseInt(feet) * 12 + (parseInt(inches) || 0);

    // Convert inches to meters
    const heightInMeters = totalInches * 0.0254;

    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setBmiResult(`Your BMI is ${bmi} (${category})`);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-md  mb-10 ">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          BMI Calculator
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Height:</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              placeholder="Feet"
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="number"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              placeholder="Inches"
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Weight (in kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Calculate BMI
        </button>

        {bmiResult && (
          <div className="mt-6 text-center font-semibold text-lg text-gray-700">
            {bmiResult}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BMICalculator;
