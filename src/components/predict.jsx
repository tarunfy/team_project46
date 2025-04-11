"use client";
import { useState } from "react";

export default function Predict() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://d26c-35-196-228-75.ngrok-free.app/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to get prediction");

      const data = await response.json();
      setPrediction(data.prediction); // Update UI with prediction result
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error getting prediction.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Skin Disease Predictor</h1>

      {/* File Upload */}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Get Prediction"}
        </button>
      </form>

      {/* Prediction Output */}
      {prediction && <h2>Prediction: {prediction}</h2>}

      <style jsx>{`
        .container {
          text-align: center;
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        input {
          margin: 10px 0;
          padding: 10px;
        }
        .preview-image {
          width: 100%;
          max-width: 300px;
          margin: 10px 0;
          border-radius: 5px;
        }
        button {
          padding: 10px 20px;
          margin-top: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
