import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/UseAuth";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { authErrors, registerAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onRegister = handleSubmit(async (values) => {
    await registerAuth(values);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        {authErrors && (
          <p className="bg-red-500 p-2 text-white w-full text-center rounded-md">
            {authErrors.message}
          </p>
        )}
        <form onSubmit={onRegister}>
          <input
            type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
            {...register("username", {
              required: true,
              minLength: 5,
              maxLength: 32,
            })}
          />

          {errors.username?.type === "required" && (
            <span className="text-red-500">Username is required</span>
          )}
          {errors.username?.type === "minLength" && (
            <span className="text-red-500">
              Username must be at least 5 characters
            </span>
          )}
          {errors.username?.type === "maxLength" && (
            <span className="text-red-500">
              Username must be at most 32 characters
            </span>
          )}

          <input
            type="email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
            {...register("email", {
              required: true,
              minLength: 6,
              maxLength: 64,
            })}
          />

          {errors.email?.type === "required" && (
            <span className="text-red-500">Email is required</span>
          )}
          {errors.email?.type === "minLength" && (
            <span className="text-red-500">
              Email must be at least 6 characters
            </span>
          )}
          {errors.email?.type === "maxLength" && (
            <span className="text-red-500">
              Email must be at most 64 characters
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-500">Email is invalid</span>
          )}

          <input
            type="password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 32,
            })}
          />

          {errors.password?.type === "required" && (
            <span className="text-red-500">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500">
              Password must be at least 8 characters
            </span>
          )}
          {errors.password?.type === "maxLength" && (
            <span className="text-red-500">
              Password must be at most 32 characters
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between mt-2">
          <span>Already have an account?</span>
          <Link to="/login" className="text-sky-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
