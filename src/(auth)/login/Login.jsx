import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
const Login = () => {
  const { user, setUser, setIsLoggedIn } =
    useContext(Context); /* access user context */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        sessionStorage.setItem("user", JSON.stringify(result));
        setUser(result);
        setIsLoggedIn(true);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000); // Redirect after 1 second
      } else {
        toast.error("Login failed! Please check your credentials.");
        console.error("Login failed:", res.statusText);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="h-screen w-screen wrapper flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-black mb-4 text-center">
          Welcome back <motion.span />
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="loginWrapper flex flex-col rounded-4xl p-5 gap-5"
        >
          <div className="flex flex-col gap-4 w-80">
            <div className="flex flex-col gap-1  ">
              <label htmlFor="username">username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="border-2 border-gray-300 peer  rounded-md shadow-md hover:shadow-blue-300 hover:shadow-md focus:shadow-blue-400 focus:outline-0 px-4 py-2"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="border-2 border-gray-300 shadow-md hover:shadow-blue-300  focus:shadow-blue-400 rounded-md px-4 py-2 focus:outline-0 "
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-black hover:scale-105 active:scale-90 text-white bg-black py-2 rounded-2xl"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
