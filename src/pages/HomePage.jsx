import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-white mt-4">
        Welcome to Tasks Manager!
      </h1>
    </div>
  );
}

export default HomePage;
