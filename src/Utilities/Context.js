import { createContext } from "react";

const CartContext = createContext(
    {
        cartItems: [],
        subTotalAmount: 0,
        discount: 0
    }
)

export default CartContext;