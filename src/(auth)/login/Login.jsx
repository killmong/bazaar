import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Context } from "../../context/Context";
import InputField from "../../common/components/InputField";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(Context);

  console.log("Login - User Context:", { user, isLoggedIn }); 

  let navigate = useNavigate();
  function handleusername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((loginData) => {
        setUser(loginData);
        console.log("User Data:", loginData); // Log entire user object

        if (loginData.accessToken) {
          console.log("Access Token:", loginData.accessToken);

          fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${loginData.accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((userData) => {
              console.log("User Data:", userData);
              sessionStorage.setItem("user", JSON.stringify(userData));
              sessionStorage.setItem("isLoggedIn", true);

              setUser(sessionStorage.getItem("user"));
              setIsLoggedIn(true);
              console.log("User Data:", userData); // Log entire user object
              navigate("/");
            })
            .catch((err) => {
              console.error("Error fetching user details:", err);
              setIsLoggedIn(false);
            });
        } else {
          setIsLoggedIn(false);
          console.log("Login failed:", loginData);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setIsLoggedIn(false);
      });
  };

  return (
    <div className=" h-screen w-screen  wrapper flex justify-center">
      <div className=" flex flex-col   items-center">
        <h2 className="text-3xl text-center font-bold text-black mb-4">
          Welcome back <motion.span></motion.span>
        </h2>

        <form
          onSubmit={handleLogin}
          className=" loginWrapper flex flex-row   rounded-4xl p-5 gap-5"
        >
          <div className="flex flex-col gap-4">
            <InputField
              typeText="username"
              placeHolderText="username"
              tag="username"
              label="username"
              id="username"
              name={"username"}
              value={username}
              onChangeFunction={handleusername}
              inputClass=" border-2 border-gray-300 rounded-md px-4 py-2"
            />
            {console.log(username)}
            <InputField
              typeText="password"
              placeHolderText="Password"
              tag="password"
              label="Password"
              id="password"
              name={"password"}
              value={password}
              onChangeFunction={handlePassword}
              inputClass=" border-2 border-gray-300 rounded-md px-4 py-2"
            />
            {console.log(password)}
            <button
              type="submit"
              value="submit"
              className="btn-black text-center rounded-2xl"
            >
              Login
            </button>{" "}
          </div>
        </form>
      </div>

      {console.log("User:", user)}
      {console.log("Is Logged In:", isLoggedIn)}
    </div>
  );
};

export default Login;
