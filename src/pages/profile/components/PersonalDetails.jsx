import React, { useContext, useState } from "react";
import { Context } from "../../../context/Context";
const PersonalDetails = () => {
  const { user } = useContext(Context);
  console.log(user);

  const { firstName, lastName, birthDate, username, age, email, image } =
    user || {}; // Add `|| {}` to prevent destructuring null on first render

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col border pd10 rounded-4xl">
        <div className="flex justify-between">
          <div className="flex-1">
            <h2>
              Username: <span>{username}</span>
            </h2>
            <div className="flex ">
              <label htmlFor="">Name :</label>
              <p>
                {firstName} {lastName}
              </p>
            </div>
            <div className="flex ">
              <label htmlFor="">Age:</label>
              <p>{age}</p>
            </div>
            <div className="flex ">
              <label htmlFor="">Email :</label>
              <p>{email}</p>
            </div>

            <div className="flex ">
              <label htmlFor="">DOB :</label>
              <p>{birthDate}</p>
            </div>
          </div>
          <div className="w-24 h-24">
            <label htmlFor="Profile">Profile:</label>
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
