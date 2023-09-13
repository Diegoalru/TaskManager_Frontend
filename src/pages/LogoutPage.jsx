import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { useTasks } from "../context/UseTasks";

function LogoutPage() {
  const { logoutAuth, isAuthenticated } = useAuth();
  const { clearTasks } = useTasks();

  const navigate = useNavigate();

  useEffect(() => {
    async function closeSession() {
      try {
        await clearTasks();
        await logoutAuth();
      } catch (err) {
        console.log(err);
      } finally {
        navigate("/");
      }
    }

    if (isAuthenticated) {
      closeSession();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, logoutAuth, clearTasks]);

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
}

export default LogoutPage;
