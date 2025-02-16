import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Ensure shadcn/ui is installed
import Navbar from "@/Components/LandingPage/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuestionForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [visibility, setVisibility] = useState("private");
    const [questions, setQuestions] = useState([{ text: "", answers: [{ text: "" }] }]);
    const [fadeIn, setFadeIn] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCompanyChange = (e) => setCompany(e.target.value);
    const handleVisibilityChange = (e) => setVisibility(e.target.value);

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].text = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex].text = value;
        setQuestions(newQuestions);
    };

    const addQuestionField = () => {
        setQuestions([...questions, { text: "", answers: [{ text: "" }] }]);
    };

    const addAnswerField = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push({ text: "" });
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }
        if (!description.trim()) {
            setError("Description is required.");
            return;
        }
        if (!company.trim()) {
            setError("Company name is required.");
            return;
        }
        if (questions.some((q) => q.text.trim() === "")) {
            setError("All questions must be filled.");
            return;
        }
        if (questions.some((q) => q.answers.some((a) => a.text.trim() === ""))) {
            setError("All answers must be filled.");
            return;
        }

        setError("");

        try {
            console.log({ title, description, company, visibility, questions });
            const response = await axios.post(
                "http://localhost:5000/api/collections/createCollection",
                { title, description, company, visibility, questions },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error creating collection:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
                <div className={`mt-20 w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg transition-opacity duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
                    <h2 className="text-2xl font-bold text-center mb-4">Create a new Collection</h2>

                    {error && <p className="text-red-500 text-center font-semibold mb-3">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-lg font-semibold mb-2">Title:</label>
                            <input type="text" value={title} onChange={handleTitleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter title" required />
                        </div>
                        
                        <div>
                            <label className="block text-lg font-semibold mb-2">Description:</label>
                            <input type="text" value={description} onChange={handleDescriptionChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter description" required />
                        </div>
                        
                        <div>
                            <label className="block text-lg font-semibold mb-2">Company Name:</label>
                            <input type="text" value={company} onChange={handleCompanyChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter company name" required />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2">Visibility:</label>
                            <select value={visibility} onChange={handleVisibilityChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                        </div>

                        {questions.map((question, qIndex) => (
                            <div key={qIndex} className="space-y-2">
                                <input type="text" value={question.text} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder={`Enter question ${qIndex + 1}`} required />

                                {question.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className="flex space-x-2">
                                        <input type="text" value={answer.text} onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder={`Enter answer ${aIndex + 1}`} required />
                                    </div>
                                ))}
                                <button type="button" onClick={() => addAnswerField(qIndex)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">+ Add Answer</button>
                            </div>
                        ))}

                        <button type="button" onClick={addQuestionField} className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 w-full">+ Add Question</button>
                        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Create Collection</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default QuestionForm;
