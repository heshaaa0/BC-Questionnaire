import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PhoneForm() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (phone.trim()) {
      localStorage.setItem("userPhone", phone);
      navigate("/questionnaire");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl">Enter Your Phone Number</h2>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mt-4"
      />
      <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Next
      </button>
    </div>
  );
}
