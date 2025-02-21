import { useState } from "react";
import axios from "axios";

const questions = [
  { id: 1, text: "What is your favorite color?" },
  { id: 2, text: "What is your hobby?" },
];

export default function Questionnaire() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  
  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const userName = localStorage.getItem("userName") || "";
    const userPhone = localStorage.getItem("userPhone") || "";

    const data = { name: userName, phone: userPhone, responses: answers };

    await axios.post("http://localhost:5000/save", data);
    alert("Responses saved!");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">Answer the Questions</h2>
      {questions.map((q) => (
        <div key={q.id} className="mt-4">
          <p>{q.text}</p>
          <input
            type="text"
            className="border p-2"
            onChange={(e) => handleChange(q.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 mt-4">
        Submit
      </button>
    </div>
  );
}
