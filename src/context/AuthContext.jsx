import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authErrors, setErrors] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkTokenFromUser() {
      try {
        setLoading(true);
        const token = Cookies.get("token");

        if (!token) {
          return;
        }

        await verifyTokenRequest(token).then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          }
        }).catch((error) => {

          console.log(error.response.status);

          if (error.response.status === 500) {
            throw error;
          }
        });
      } catch (error) {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkTokenFromUser();
  }, []);

  useEffect(() => {
    // If errors were found when trying to authenticate, show them and
    // set a timeout to remove them after 7 seconds.

    if (authErrors) {
      setTimeout(() => {
        setErrors(null);
      }, 7000);

      return () => clearTimeout();
    }
  }, [authErrors]);

  /**
   * Registers a new user and sets the user data and authentication status accordingly.
   * @async
   * @function registerAuth
   * @param {Object} userData - The user data to be registered.
   * @param {string} userData.username - The username of the user.
   * @param {string} userData.email - The email of the user.
   * @param {string} userData.password - The password of the user.
   * @returns {Promise<void>}
   */
  async function registerAuth(userData) {
    try {
      await registerRequest(userData)
        .then((response) => {
          setUser(response.data.user);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.response.status === 500) {
            throw error;
          }

          setErrors({
            message: error.response.data.message,
            status: error.response.status,
          });
        });
    } catch (exception) {
      // If the error is a 500 error, it means that the server is down.
      // We don't want to show the user a 500 error, so we'll just show
      // a generic error message instead.

      setErrors({
        message: "Something went wrong. Please try again later.",
        status: exception.response.status,
      });
    }
  }

  /**
   * Logs in an existing user and sets the user data and authentication status accordingly.
   * @async
   * @function loginAuth
   * @param {Object} userData - The user data to be logged in.
   * @param {string} userData.username - The username of the user.
   * @param {string} userData.password - The password of the user.
   * @returns {Promise<void>}
   */
  async function loginAuth(userData) {
    try {
      await loginRequest(userData)
        .then((response) => {
          setUser(response.data.user);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.response.status === 500) {
            throw error;
          }

          setErrors({
            message: error.response.data.message,
            status: error.response.status,
          });
        });
    } catch (exception) {
      // If the error is a 500 error, it means that the server is down.
      // We don't want to show the user a 500 error, so we'll just show
      // a generic error message instead.

      setErrors({
        message: "Something went wrong. Please try again later.",
        status: exception.response.status,
      });
    }
  }

  /**
   * Logs out the current user and sets the user data and authentication status accordingly.
   * @async
   * @function logoutAuth
   * @returns {Promise<void>}
   */
  async function logoutAuth() {
    try {
      if (Cookies.get("token") !== undefined | null) {
        Cookies.remove("token");
      }

      setUser(null);
      setIsAuthenticated(false);
    } catch (exception) {
      console.error("Something failed while trying to logout the user.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authErrors,
        isAuthenticated,
        registerAuth,
        loginAuth,
        logoutAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
