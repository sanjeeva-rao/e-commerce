import { useContext } from "react";
import CartContext from "../Utilities/Context";
import Cart from "./Cart";

const RightDB = () => {
  const { cartItems, setCartIems, subTotalAmount, setSubTotalAmount, discount, setDiscount } =
    useContext(CartContext);

  const updateCartItems = (item, val) => {
    item.numberOfItems += val;
    setSubTotalAmount(subTotalAmount + val * parseInt(item.price));
    const dummy = cartItems.filter((item) => item.numberOfItems !== 0);
    setCartIems(dummy);
  };

  return (
    <div className="mt-12 rounded-xl shadow-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r rounded-t-xl">
        <h2 className="text-lg font-semibold">🛒 Cart Summary</h2>
      </div>

      {/* Cart Items */}
      <div className="px-6 py-4">
        {cartItems.length === 0 ? (
          <div className="text-gray-500 text-center py-6 italic">Your cart is empty</div>
        ) : (
          <>
            <div className="flex justify-between text-sm font-semibold text-gray-600 border-b border-gray-200 pb-2 mb-2">
              <span>Item</span>
              <span>Qty</span>
              <span>Amount</span>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-100 text-gray-700"
              >
                <div className="w-[40%] font-medium">{item.name}</div>

                {/* Quantity controls */}
                <div className="flex items-center space-x-2">
                  <button
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
                    onClick={() => updateCartItems(item, -1)}
                  >
                    −
                  </button>
                  <span className="px-2">{item.numberOfItems}</span>
                  <button
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
                    onClick={() => updateCartItems(item, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="text-right font-semibold text-gray-800">
                  ₹{item.price * item.numberOfItems}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Totals Section */}
      {cartItems.length !== 0 && (
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
          <div className="flex justify-between text-gray-700 py-1">
            <span>Subtotal</span>
            <span className="font-semibold">₹{subTotalAmount}</span>
          </div>

          <div className="flex justify-between items-center text-gray-700 py-2">
            <span>
              Discount ({discount}%)
              <input
                type="number"
                className="ml-2 w-16 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                min={0}
                value={discount}
                onChange={(e) => setDiscount(e.target.value < 0 ? 0 : e.target.value)}
              />
            </span>
            <span className="font-semibold text-red-600">− ₹{(subTotalAmount * discount) / 100}</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
            <span>Total</span>
            <span>₹{subTotalAmount - (subTotalAmount * discount) / 100}</span>
          </div>

          {/* Print & Clear Buttons */}
          <div className="mt-4">
            <Cart
              cartItems={cartItems}
              setCartIems={setCartIems}
              subTotalAmount={subTotalAmount}
              discount={discount}
              setDiscount={setDiscount}
              setSubTotalAmount={setSubTotalAmount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RightDB;
