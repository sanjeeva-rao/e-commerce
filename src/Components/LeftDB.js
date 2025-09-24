import { useContext, useState } from "react";
import CartContext from "../Utilities/Context";
import { defultImg } from "../Utilities/constants";

const LeftDB = ({ crackers, setCrackers, defaultCrackers }) => {
  const [searchVal, setSearchVal] = useState("");
  const { cartItems, setCartIems, subTotalAmount, setSubTotalAmount } =
    useContext(CartContext);

  const updateSearchVal = (val) => {
    setSearchVal(val);
    const searchCrackersList = defaultCrackers.filter((item) =>
      item.name.toUpperCase().includes(val.toUpperCase())
    );
    setCrackers(searchCrackersList);
  };

  const updateCartItems = (cracker) => {
    const dummy = [...cartItems];
    let itemAlreadyPresent = false;

    dummy.forEach((item) => {
      if (item.id === cracker.id) {
        itemAlreadyPresent = true;
        return false;
      }
      return true;
    });

    if (!itemAlreadyPresent) {
      setSubTotalAmount(subTotalAmount + parseInt(cracker.price));
      cracker.numberOfItems = 1;
      dummy.push(cracker);
      setCartIems(dummy);
    }
  };

  return (
    <div className="">
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search Crackers..."
            value={searchVal}
            className="w-full h-10 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => updateSearchVal(e.target.value)}
          />
        </div>

        {/* Crackers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {crackers.map((cracker) => (
            <div
              key={cracker.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={defultImg}
                alt="logo"
                className="rounded-t-xl w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {cracker.name}
                </h3>
                <p className="text-gray-600 mt-1 font-medium">₹{cracker.price}</p>
                <button
                  onClick={() => updateCartItems(cracker)}
                  className="mt-4 w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-2 rounded-lg shadow-md hover:from-red-700 hover:to-pink-700 transition"
                >
                  ➕ Add to Cart
                </button>
              </div>
            </div>
          ))}

          {crackers.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10 italic">
              No crackers found for "<span className="font-semibold">{searchVal}</span>"
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LeftDB;
