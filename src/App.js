import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import { useState } from 'react';
import CartContext from './Utilities/Context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import InvoiceHistory from './Components/InvoiceHistory';

function App() {
  const [cartItems, setCartIems] = useState([]);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const browserRouter = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home/>,
        children: [
          {
            path: "/",
            element: <Dashboard />
          },
          {
            path: "/history",
            element: <InvoiceHistory/>
          }
        ]
      }
    ]
  )
  return (
    <CartContext.Provider value={{cartItems: cartItems, setCartIems, subTotalAmount: subTotalAmount, setSubTotalAmount, discount: discount, setDiscount}}>
      <RouterProvider router={browserRouter} />
    </CartContext.Provider>
  );
}

export default App;
