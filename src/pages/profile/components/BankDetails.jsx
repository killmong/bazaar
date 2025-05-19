import React, { useContext, useState } from "react";
import { Context } from "../../../context/Context";
const BankDetails = () => {
  const { user } = useContext(Context);
  console.log(user);

  const { image, username } = user || {}; // Add `|| {}` to prevent destructuring null on first render
  const { bank } = user || {};
  const { cardNumber, cardType, cardExpire } = bank || {};
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col border pd10 rounded-4xl">
        <div className="flex justify-between">
          <div className="flex-1">
            <h2>
              Username: <span>{username}</span>
            </h2>
            <div className="flex ">
              <label htmlFor="">Card :</label>
              <p>{cardNumber}</p>
            </div>
            <div className="flex ">
              <label htmlFor="">Expire:</label>
              <p>{cardExpire}</p>
            </div>
            <div className="flex ">
              <label htmlFor="">Card Type :</label>
              <p>{cardType}</p>
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

export default BankDetails;
