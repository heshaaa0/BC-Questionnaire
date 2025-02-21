import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Questionnaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    "What is your favorite color?",
    "What is your favorite food?",
    "What is your favorite hobby?",
  ];

  if (!location.state?.name) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      const userData = {
        name: location.state.name,
        phone,
        answers,
      };
      console.log("User Data:", userData); // Save this to an API or file
      navigate("/submit-success");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold">Hello, {location.state.name}!</h2>
      <p className="text-gray-600">Please enter your phone number and answer the questions.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded p-2 w-64"
          required
        />

        {questions.map((question, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-gray-700">{question}</label>
            <input
              type="text"
              placeholder="Your answer"
              value={answers[question] || ""}
              onChange={(e) => setAnswers({ ...answers, [question]: e.target.value })}
              className="border rounded p-2 w-64"
              required
            />
          </div>
        ))}

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Questionnaire;
