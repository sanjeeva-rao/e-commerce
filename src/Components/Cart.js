import { useContext } from "react";
import { shop_name } from "../Utilities/constants";
import CartContext from "../Utilities/Context";

const Cart = () => {
    const {cartItems, setCartIems, subTotalAmount, setSubTotalAmount, discount} = useContext(CartContext);
    var totalItems = 0;
    cartItems.forEach(item => totalItems += item.numberOfItems);
    return <div className="w-[27%] px-2 py-4">
        <div className="font-bold text-xl text-center">{shop_name.toUpperCase()}</div>
        <div className="text-center font-semibold">CASH BILL</div>
        <div className="font-semibold">.......................................................................................</div>
        <div className="flex pt-1">
            <div className="w-[50%]">Item</div>
            <div className="w-[17%]">Qty</div>
            <div className="w-[17%]">Price</div>
            <div className="w-[16%]">Amt</div>
        </div>
        <div className="font-semibold">.......................................................................................</div>
        {
            cartItems.map(item => <div key={item.id} className="flex">
                <div className="w-[50%] text-sm">{item.name}</div>
                <div className="w-[17%]">{item.numberOfItems}</div>
                <div className="w-[17%]">{item.price}.00</div>
                <div className="w-[16%]">{item.numberOfItems *  parseInt(item.price)}.00</div>
            </div>)
        }
        <div className="font-semibold">.......................................................................................</div>
        <div className="flex justify-between">
            <div>Items: {cartItems.length}</div>
            <div>Total Quantity: {totalItems}</div>
        </div>
        <div className="font-semibold pb-2">.......................................................................................</div>
        <div className="text-right">Sub Total: ₹{subTotalAmount}.00</div>
        <div className="text-right">Discount: ₹{subTotalAmount*discount/100}.00</div>
        <div className="text-xl font-bold flex justify-between py-4">
            <div>Grand Total</div>
            <div>₹ {subTotalAmount - (subTotalAmount*discount/100)}.00</div>
        </div>
        <div>**************************************************</div>
        <div className="text-center">THANK YOU. VISIT AGAIN</div>
    </div>
}
export default Cart;