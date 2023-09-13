import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

function Navbar() {
  const { isAuthenticated } = useAuth();
  
  return (
    <nav className="bg-zinc-700 flex justify-between py-5 px-10 m-4 rounded-lg">
      <h1 className="text-2xl font-bold">Tasks Manager</h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/logout" className="bg-red-500 px-4 py-1 rounded-sm">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="bg-green-600 px-4 py-1 rounded-sm ml-3">
                Register
                </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

// TODO: Hide the login or register buttons if the user is in the login or register page.
