import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubmitSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after a few seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold text-green-600">🎉 Submission Successful!</h2>
      <p className="text-gray-600 mt-2">Thank you for completing the questionnaire.</p>
      <p className="text-gray-500">Redirecting to home...</p>
    </div>
  );
};

export default SubmitSuccess;
