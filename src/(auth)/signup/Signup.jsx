import React, { useState } from "react";
import InputField from "../../common/components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents page reload

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup successful:", data);

      // ✅ Navigate after successful signup
      navigate("/shop");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" border  signupWrapper flex flex-row  border-violet-500 rounded-4xl"
    >
      <form className="flex signup-pd flex-col gap-5 ">
        <InputField
          typeText="text"
          placeHolderText="username"
          tag="username"
          label="username"
          id="username"
          name={"username"}
          value={formData.username}
          onChangeFunction={handleFormChange}
          inputClass=" border-2 border-gray-300 rounded-md w-full px-4 py-2"
        />
        <div className="flex md:flex-row flex-col gap-4">
          <InputField
            typeText="text"
            placeHolderText="First Name"
            tag="first name"
            label="First Name"
            id="firstName"
            name={"firstName"}
            value={formData.firstName}
            onChangeFunction={handleFormChange}
            inputClass=" border-2 border-gray-300 rounded-md px-4 py-2"
          />
          <InputField
            typeText="text"
            placeHolderText="Last Name"
            tag="last name"
            label="Last Name"
            id="lastName"
            name={"lastName"}
            value={formData.lastName}
            onChangeFunction={handleFormChange}
            inputClass=" border-2 border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4">
          <InputField
            typeText="email"
            placeHolderText="Email"
            tag="email"
            label="Email"
            id="email"
            name={"email"}
            value={formData.email}
            onChangeFunction={handleFormChange}
            inputClass=" border-2 border-gray-300 rounded-md px-4 py-2"
          />
          <InputField
            typeText="password"
            placeHolderText="Password"
            tag="password"
            label="Password"
            id="password"
            name={"password"}
            value={formData.password}
            onChangeFunction={handleFormChange}
            inputClass=" border-2 border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <Link
          type="submit"
          to="/shop"
          onClick={handleSignup}
          className="btn w-full btn-black"
        >
          Signup!
        </Link>
        <p className="text-end text-gray-400">
          Already have an Account!{" "}
          <Link to={"/login"} className="text-orange-500">
            Login
          </Link>
        </p>

        <div></div>
      </form>

      <div className="pd-5 bg-violet-600 rounded-4xl border-0 w-1/2 h-auto ">
        <img
          src="./signup.png"
          className="w-full h-full object-contain"
          alt="Signup"
        />
      </div>
    </motion.div>
  );
};

export default Signup;
