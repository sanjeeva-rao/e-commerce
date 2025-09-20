import { useContext, useState } from "react";
import CartContext from "../Utilities/Context";

const LeftDB = ({crackers,setCrackers,defaultCrackers}) => {
    const [searchVal, setSearchVal] = useState("");

    const {cartItems, setCartIems, subTotalAmount, setSubTotalAmount} = useContext(CartContext);
    
    const updateSearchVal = (val) => {
      setSearchVal(val);
      var seachCrackersList = defaultCrackers.filter(item => item.name.toUpperCase().includes(val.toUpperCase()));
      setCrackers(seachCrackersList);
    }

    const updateCartItems = (cracker) => {
      var dummy = [...cartItems];
      var itemAlreadyPesent = false;
      dummy.forEach(function(item){
        if(item.id === cracker.id){
          itemAlreadyPesent = true
          return false;
        }
        return true;
      })
      if(!itemAlreadyPesent){
        setSubTotalAmount(subTotalAmount+parseInt(cracker.price))
        cracker.numberOfItems = 1;
        dummy.push(cracker);
        setCartIems(dummy);
      }
    }

    return <div className="w-[60%] lg:w-[60%]">
    <main className="container mx-auto px-4 py-8">
        <input type="text" placeholder="Search Crackers" className="h-8 w-[100%] my-2 border border-black px-2" onChange={(e)=>updateSearchVal(e.target.value)}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-2">
          {crackers.map((cracker) => (
            <div
              key={cracker.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
            >
              <img
                src={cracker.image}
                alt={cracker.name}
                className="rounded-lg w-full h-30 object-cover"
              />
              <h3 className="mt-3 text-lg font-bold">{cracker.name}</h3>
              <p className="text-gray-600">₹{cracker.price}</p>
              <button className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700" onClick={()=>updateCartItems(cracker)}>
                Order Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
}
export default LeftDB;