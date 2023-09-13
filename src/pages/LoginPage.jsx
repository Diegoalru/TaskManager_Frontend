import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginAuth, authErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onLogin = handleSubmit(async (values) => {
    await loginAuth(values);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {authErrors && (
          <div className="bg-red-500 p-2 my-2 text-white w-full text-center rounded-md">
            {Array.isArray(authErrors.message) ? (
              authErrors.message.map((err) => <p key={err}>{err}</p>)
            ) : (
              <p>{authErrors.message}</p>
            )}
          </div>
        )}
        <form onSubmit={onLogin}>
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
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between mt-2">
          <span>Don&apos;t have an account?</span>
          <Link to="/register" className="text-sky-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
