import { useRef } from "react";
import { shop_name } from "../Utilities/constants";

const Cart = ({cartItems, setCartIems, subTotalAmount, discount, setDiscount, setSubTotalAmount}) => {
  const invoiceRef = useRef();

  const handlePrint = () => {
    const printContent = invoiceRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    const date = new Date();
    const orderNo = Math.floor(Math.random() * 1000000);

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${orderNo}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              margin: 0;
              padding: 0;
              background: #fff;
              color: #000;
            }
            .invoice {
              width: 300px; 
              margin: 0 auto;
              padding: 10px 5px;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .small { font-size: 11px; }
            .header { font-size: 16px; margin-bottom: 2px; }
            .border { border-bottom: 1px dashed #000; margin: 4px 0; }
            .double-border { border-bottom: 2px dashed #000; margin: 4px 0; }
            .flex { display: flex; justify-content: space-between; margin: 2px 0; }
            .item-name { width: 55%; word-wrap: break-word; }
            .qty { width: 10%; text-align: right; }
            .price { width: 15%; text-align: right; }
            .amt { width: 20%; text-align: right; }
            .totals { margin-top: 3px; font-size: 12px; display: flex; justify-content: space-between; }
            .grand-total { font-size: 14px; font-weight: bold; }
            .footer { margin-top: 6px; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="center header bold">${shop_name.toUpperCase()}</div>
            <div class="center small bold">CASH BILL</div>
            <div class="center small">Order No: ${orderNo}</div>
            <div class="center small">${date.toLocaleString()}</div>
            <div class="border"></div>

            <div class="flex bold small">
              <div class="item-name">Item</div>
              <div class="qty">Qty</div>
              <div class="price">Price</div>
              <div class="amt">Amt</div>
            </div>
            <div class="border"></div>

            ${cartItems
              .map(
                (item) => `
              <div class="flex small">
                <div class="item-name">${item.name}</div>
                <div class="qty">${item.numberOfItems}</div>
                <div class="price">${item.price}.00</div>
                <div class="amt">${item.numberOfItems * parseInt(item.price)}.00</div>
              </div>
            `
              )
              .join("")}

            <div class="border"></div>

            <div class="totals">
              <span>Items: ${cartItems.length}</span>
              <span>Total Qty: ${cartItems.reduce((acc, item) => acc + item.numberOfItems, 0)}</span>
            </div>
            <div class="totals bold">
              <span>Sub Total:</span>
              <span>₹${subTotalAmount}.00</span>
            </div>
            <div class="totals bold">
              <span>Discount:</span>
              <span>₹${(subTotalAmount * discount) / 100}.00</span>
            </div>

            <div class="double-border"></div>

            <div class="totals grand-total">
              <span>Grand Total:</span>
              <span>₹${subTotalAmount - (subTotalAmount * discount) / 100}.00</span>
            </div>

            <div class="border"></div>
            <div class="center footer">THANK YOU. VISIT AGAIN</div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const clearCart = () => {
        setCartIems([]);
        setDiscount(0);
        setSubTotalAmount(0);
    }

  return (
    <div className="">
      <div ref={invoiceRef} className="hidden"></div>
      <div className="flex justify-between">
        <button
            onClick={handlePrint}
            className="bg-gray-700 px-2 py-2 my-7 rounded text-white hover:bg-gray-800"
        >
            Print Invoice
        </button>
        <button className="bg-gray-700 px-2 py-2 my-7 rounded text-white hover:bg-gray-800" onClick={clearCart}>
          Clear Cart
        </button>

      </div>
    </div>
  );
};

export default Cart;
