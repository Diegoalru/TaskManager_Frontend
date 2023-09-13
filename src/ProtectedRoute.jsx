import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/UseAuth"

function ProtectedRoute() {

  const {isAuthenticated, loading} = useAuth()

  if(loading) {
    return <div>Loading...</div>
  }
  
  if(!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }

  return <Outlet />
}

export default ProtectedRoute