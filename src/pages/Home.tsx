import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      navigate("/questionnaire", { state: { name } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p className="text-gray-600 mb-4">Please enter your name to continue.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-64"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Next
        </button>
      </form>
    </div>
  );
};

export default Home;
