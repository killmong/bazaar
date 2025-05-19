import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Context } from "../../context/Context"; /* import user context */
import { toast } from "react-toastify";

const Signup = () => {
  const { user, setUser } = useContext(Context); /* access user context */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); /* register inputs to RHF  */

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form data:", data); /* log form data */
    try {
      const res = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        setUser(result);
        toast.success("Signup successful!"); /* feedback via toast */
        sessionStorage.setItem(
          "user",
          JSON.stringify(result)
        ); /* store user info */
        navigate("/"); /* redirect on success */
      } else {
        toast.error("Signup failed! Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Server error during signup");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border signupWrapper flex flex-row border-violet-500 rounded-4xl"
    >
      <form
        onSubmit={handleSubmit(onSubmit)} /* handleSubmit wraps onSubmit  */
        className="flex signup-pd flex-col gap-5 w-1/2"
      >
        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-base text-black">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username" /* standard placeholder :contentReference[oaicite:2]{index=2} */
            {...register("username", { required: "Username is required" })}
            className={`border-2 rounded-md px-4 py-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* First & Last Name */}
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName" className="text-base text-black">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              {...register("firstName", { required: "First name is required" })}
              className={`border-2 rounded-md px-4 py-2 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="lastName" className="text-base text-black">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              {...register("lastName", { required: "Last name is required" })}
              className={`border-2 rounded-md px-4 py-2 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        {/* Email & Password */}
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-base text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`border-2 rounded-md px-4 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-base text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className={`border-2 rounded-md px-4 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className="btn w-full btn-black">
          Signup!
        </button>

        <p className="text-end text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500">
            Login
          </Link>
        </p>
      </form>

      <div className="pd-5 bg-violet-600 rounded-4xl w-1/2">
        <img
          src="./signup.png"
          alt="Signup"
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
};

export default Signup;
