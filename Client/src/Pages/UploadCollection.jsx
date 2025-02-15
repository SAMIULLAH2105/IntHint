import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Ensure shadcn/ui is installed

const QuestionForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [uploadType, setUploadType] = useState(""); // Private or Public
  const [questions, setQuestions] = useState([""]);
  const [fadeIn, setFadeIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFadeIn(true); // Trigger animation on mount
  }, []);

  const handleCompanyChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleCompanyTypeChange = (e) => {
    setUploadType(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    setQuestions([...questions, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      setError("Company name is required.");
      return;
    }

    if (questions.some((q) => q.trim() === "")) {
      setError("All questions must be filled.");
      return;
    }

    setError(""); // Clear errors if all inputs are valid

    console.log({
      companyName,
      questions,
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black p-4 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center text-white">
          <a
            href="/"
            className="text-xl font-bold hover:text-blue-400 transition duration-300"
          >
            My Shop
          </a>

          <div className="space-x-4">
            <a href="#" className="hover:text-blue-400 transition duration-300">
              Home
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              Products
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              Contact
            </a>
          </div>
          <Button
            className="bg-black hover:bg-gray-800 transition duration-300"
            onClick={() => (window.location.href = "/user/viewcollection")}
          >
            My Questions
          </Button>
        </div>
      </nav>

      {/* Form Section */}
      <div
        className={`mt-20 w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg transition-opacity duration-700 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Create a Question Form
        </h2>

        {error && (
          <p className="text-red-500 text-center font-semibold mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name Input */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Company Name:
            </label>
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Company Type Dropdown */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Upload Type:
            </label>
            <select
              value={uploadType}
              onChange={handleCompanyTypeChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>

          {/* Dynamic Question Inputs */}
          {questions.map((question, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter question ${index + 1}`}
                required
              />
              {/* Add More Button */}
              {index === questions.length - 1 && (
                <button
                  type="button"
                  onClick={addQuestionField}
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  +
                </button>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;