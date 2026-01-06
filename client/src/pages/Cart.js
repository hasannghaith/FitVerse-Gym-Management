import React from "react";

const Cart = ({ cart, removeFromCart, placeOrder }) => {

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#111] p-4 rounded-lg mb-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-[#00df9a]">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  Type: {item.type}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>

            <button
              onClick={placeOrder}
              className="mt-4 bg-[#00df9a] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#00c785]"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
