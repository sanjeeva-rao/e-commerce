import { useEffect, useState } from "react";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);

  // Load invoices from localStorage
  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(savedInvoices);
  }, []);

  // ✅ Save back to localStorage whenever invoices change
  const saveInvoices = (newInvoices) => {
    setInvoices(newInvoices);
    localStorage.setItem("invoices", JSON.stringify(newInvoices));
  };

  // ✅ Delete a single invoice
  const deleteInvoice = (index) => {
    const updated = invoices.filter((_, i) => i !== index);
    saveInvoices(updated);
  };

  // ✅ Clear all invoices
  const clearAllInvoices = () => {
    if (window.confirm("Are you sure you want to clear all invoices?")) {
      saveInvoices([]);
    }
  };

  return (
    <div className="p-4 mt-16">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Invoice History</h1>
        {invoices.length > 0 && (
          <button
            onClick={clearAllInvoices}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      {invoices.length === 0 ? (
        <p>No invoices saved yet.</p>
      ) : (
        <div className="space-y-6">
          {invoices.map((invoice, index) => (
            <div key={index} className="border p-4 rounded shadow">
              {/* Header */}
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Date:</span>
                <span>{invoice.date}</span>
              </div>

              {/* Invoice table */}
              <table className="w-full text-sm border-t border-b my-2">
                <thead>
                  <tr className="text-left">
                    <th className="py-1">Item</th>
                    <th className="py-1">Qty</th>
                    <th className="py-1">Price</th>
                    <th className="py-1">Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.numberOfItems}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.numberOfItems * parseInt(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="text-right">Sub Total: ₹{invoice.subTotalAmount}</div>
              <div className="text-right">
                Discount: ₹{(invoice.subTotalAmount * invoice.discount) / 100}
              </div>
              <div className="text-right font-bold">
                Grand Total: ₹{invoice.grandTotal}
              </div>

              {/* Delete Button */}
              <div className="text-right mt-2">
                <button
                  onClick={() => deleteInvoice(index)}
                  className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 text-sm"
                >
                  Delete Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceHistory;
