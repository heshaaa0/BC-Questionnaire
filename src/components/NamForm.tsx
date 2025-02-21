import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NameForm() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name);
      navigate("/phone");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl">Enter Your Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mt-4"
      />
      <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Next
      </button>
    </div>
  );
}
