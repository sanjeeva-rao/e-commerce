import { useRef } from "react";
import { address, mobile_number, shop_name } from "../Utilities/constants";

const Cart = ({
  cartItems,
  setCartIems,
  subTotalAmount,
  discount,
  setDiscount,
  setSubTotalAmount,
}) => {
  const invoiceRef = useRef();

  const handlePrint = () => {
    if (!invoiceRef.current) return;

    const invoiceData = {
      items: cartItems,
      subTotalAmount,
      discount,
      grandTotal: subTotalAmount - (subTotalAmount * discount) / 100,
      date: new Date().toLocaleString(),
    };

    // Store latest invoice at the top
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.unshift(invoiceData);
    localStorage.setItem("invoices", JSON.stringify(invoices));

    // Open print window
    const printWindow = window.open("", "_blank", "width=400,height=600");

    // Clone current invoice preview
    const invoiceHTML = invoiceRef.current.outerHTML;

    // Copy existing stylesheets from main window
    const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
      .map((node) => node.outerHTML)
      .join("\n");

    // Write print content with fixed width
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          ${styles}
          <style>
            * { -webkit-print-color-adjust: exact; color-adjust: exact; }
            body { 
              margin: 0; 
              padding: 10px; 
              background: white; 
              width: 350px !important; 
            }
            #live-invoice { 
              width: 350px !important; 
            }
            @media print {
              @page { size: 350px auto; margin: 0; }
              body, #live-invoice { width: 350px !important; }
            }
          </style>
        </head>
        <body>
          ${invoiceHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  const clearCart = () => {
    setCartIems([]);
    setDiscount(0);
    setSubTotalAmount(0);
  };

  const orderNo = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  return (
    <div>
      {/* Action buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrint}
          className="bg-gray-700 px-2 py-2 my-7 rounded text-white hover:bg-gray-800"
        >
          Print Invoice
        </button>
        <button
          onClick={clearCart}
          className="bg-gray-700 px-2 py-2 my-7 rounded text-white hover:bg-gray-800"
        >
          Clear Cart
        </button>
      </div>

      {/* Live Preview */}
      <div
        id="live-invoice"
        ref={invoiceRef}
        className="border border-gray-400 p-3 w-[350px] bg-white text-black text-[15px] leading-snug font-semibold"
      >
        <div className="text-center text-lg font-bold">
          {shop_name.toUpperCase()}
        </div>
        <div className="text-center text-sm font-semibold">{address}</div>
        <div className="text-center text-sm font-semibold">{mobile_number}</div>
        <div className="text-center text-sm font-bold">CASH BILL</div>
        <div className="text-center text-sm">Order No: {orderNo}</div>
        <div className="text-center text-sm">{new Date().toLocaleString()}</div>
        <div className="border-b border-dashed border-black my-1"></div>

        <div className="flex font-semibold text-sm">
          <div className="w-[55%]">Item</div>
          <div className="w-[10%] text-right">Qty</div>
          <div className="w-[15%] text-right">Price</div>
          <div className="w-[20%] text-right">Amt</div>
        </div>
        <div className="border-b border-dashed border-black my-1"></div>

        {cartItems.map((item, index) => (
          <div key={index} className="flex text-sm font-medium">
            <div className="w-[55%]">{item.name}</div>
            <div className="w-[10%] text-right">{item.numberOfItems}</div>
            <div className="w-[15%] text-right">{item.price}.00</div>
            <div className="w-[20%] text-right">
              {item.numberOfItems * parseInt(item.price)}.00
            </div>
          </div>
        ))}

        <div className="border-b border-dashed border-black my-1"></div>
        <div className="flex justify-between text-sm font-medium">
          <span>Items: {cartItems.length}</span>
          <span>
            Total Qty:{" "}
            {cartItems.reduce((acc, item) => acc + item.numberOfItems, 0)}
          </span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span>Sub Total:</span>
          <span>₹{subTotalAmount}.00</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span>Discount:</span>
          <span>₹{(subTotalAmount * discount) / 100}.00</span>
        </div>

        <div className="border-b-2 border-dashed border-black my-1"></div>
        <div className="flex justify-between text-base font-bold">
          <span>Grand Total:</span>
          <span>₹{subTotalAmount - (subTotalAmount * discount) / 100}.00</span>
        </div>
        <div className="border-b border-dashed border-black my-1"></div>
        <div className="text-center text-sm font-semibold">
          THANK YOU. VISIT AGAIN
        </div>
      </div>
    </div>
  );
};

export default Cart;
