import React, {  useContext } from "react";
import { Context } from "../../context/Context";
const Cart = () => {
  const { cart } = useContext(Context); //  use {} for destructuring

  return (
    <div className="flex justify-center flex-col gap-3 ">
      <h1 className="text-3xl font-bold  text-center mt-10">Your Cart</h1>
      <div className="max-w-4xl mx-auto flex justify-center p-6 mt-10 bg-white shadow-xl rounded-xl">
        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex justify-center flex-wrap gap-4">
            {cart.map((item) => (
              <li key={item.id} className="flex flex-col ">
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.thumbnail} className="w-full h-full object-contain" alt="" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <span className="text-lg font-bold">${item.price}</span>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
