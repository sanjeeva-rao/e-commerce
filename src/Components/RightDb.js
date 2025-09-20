import { useContext, useState } from "react";
import CartContext from "../Utilities/Context";
import { useNavigate } from "react-router-dom";

const RightDB = () => {
    const {cartItems, setCartIems, subTotalAmount, setSubTotalAmount, discount, setDiscount} = useContext(CartContext);
    const navigate = useNavigate();
    
    const updateCartItems = (item,val) => {
        item.numberOfItems += val;
        setSubTotalAmount(subTotalAmount + val * parseInt(item.price))
        var dummy = cartItems.filter(item => item.numberOfItems !== 0);
        setCartIems(dummy);
    }

    const clearCart = () => {
        setCartIems([]);
        setDiscount(0);
        setSubTotalAmount(0);
    }
    
    return <div className="w-[40%] border border-black mt-10 rounded-l-lg">
        <div className="px-4 py-2">
            <div className="font-bold text-xl">Cart Items</div>
            <div className="flex justify-between px-4 py-2 text-blue-700">
                <div>Item</div>
                <div>Amount</div>
            </div>
            {
                cartItems.map(item => <div key={item.id}>
                    <div className="flex justify-between">
                        <div className="w-[40%]">{item.name} <span className="text-blue-500">{" X " +item.numberOfItems}</span></div>
                        <div>
                            <span className="cursor-pointer text-blue-600" onClick={()=>updateCartItems(item,-1)}>-</span>
                            <span className="px-2">{item.numberOfItems}</span>
                            <span className="cursor-pointer text-blue-600" onClick={()=>updateCartItems(item,1)}>+</span>
                        </div>
                        <div>₹{item.price * item.numberOfItems}</div>
                    </div>
                </div>)
            }
            {
                cartItems.length !== 0 && <div className="py-4 text-blue-600">
                    <div className="flex justify-between">
                        <div>Sub Total</div>
                        <div>₹{subTotalAmount}</div>
                    </div>
                    <div className="flex justify-between">
                        <div>Discount {"("+discount + "%"+")"} <input type="number" className="w-14 border border-black px-2" min={0} value={discount} onChange={(e)=>setDiscount(e.target.value < 0 ? 0 : e.target.value)}/></div>
                        <div>₹{subTotalAmount*discount/100}</div>
                    </div>
                    <div className="flex justify-between">
                        <div>Total Amount</div>
                        <div>{subTotalAmount - (subTotalAmount*discount/100)}</div>
                    </div>
                    <div className="flex justify-between my-8">
                        <div className="bg-blue-500 text-black px-2 py-1 rounded-lg cursor-pointer" onClick={clearCart}>Clear Cart</div>
                        <div className="bg-blue-500 text-black px-2 py-1 rounded-lg cursor-pointer" onClick={()=>navigate("/cart")}>Submit</div>
                    </div>
                </div>
            }
        </div>
    </div>
}
export default RightDB;