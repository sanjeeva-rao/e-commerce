import './App.css';
import Dashboard from './Components/Dashboard';
import { useState } from 'react';
import CartContext from './Utilities/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import InvoiceHistory from './Components/InvoiceHistory';
import SalesReport from './Components/SalesReport';
import useKeyboardShortcuts from './Utilities/useKeyboardShortcuts';

function AppContent() {
  useKeyboardShortcuts(); // hook inside router context
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="history" element={<InvoiceHistory />} />
        <Route path="report" element={<SalesReport />} />
      </Route>
    </Routes>
  );
}

function App() {
  const [cartItems, setCartIems] = useState([]);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartIems,
      subTotalAmount,
      setSubTotalAmount,
      discount,
      setDiscount
    }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
