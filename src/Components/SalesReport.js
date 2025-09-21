import { useEffect, useState } from "react";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [defaultSalesData, setDefaltSalesData] = useState([]);
  const [serachProduct, setSearchProduct] = useState("");
  const [searchDate, setSearchDate] = useState("")
  useEffect(() => {
    // Load invoices from localStorage
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

    // Flatten all invoices into a sales report
    const report = [];
    savedInvoices.forEach((invoice) => {
      invoice.items.forEach((item) => {
        report.push({
          date: invoice.date,
          product: item.name,
          qty: item.numberOfItems,
          amount: item.numberOfItems * parseInt(item.price),
        });
      });
    });

    setSalesData(report);
    setDefaltSalesData(report);
  }, []);

  // ✅ Calculate totals
  const totalQty = salesData.reduce((sum, sale) => sum + sale.qty, 0);
  const totalAmount = salesData.reduce((sum, sale) => sum + sale.amount, 0);

  const filterSalesData = (type, value) => {
    if(type === "item"){
      setSearchProduct(value);
      const filterData = defaultSalesData.filter(data => data.product.toUpperCase().includes(value.toUpperCase()));
      setSalesData(filterData);
    }
    else{
      setSearchDate(value);
      const filterData = defaultSalesData.filter(data => data.date.toUpperCase().includes(value.toUpperCase()));
      setSalesData(filterData);
    }
  }

  return (
    <div className="p-6 pt-20">
      <h1 className="text-xl font-bold mb-4">Sales Report</h1>

      {/* search Items */}
      <div>
        <input placeholder="Search Products" className="border border-gray-500 w-[40%] my-2 px-2 py-1 rounded" value={serachProduct} onChange={(e)=>filterSalesData("item", e.target.value)}/>
        <input placeholder="Search Date" className="border border-gray-500 w-[40%] my-2 px-2 py-1 rounded mx-2" value={searchDate} onChange={(e)=>filterSalesData("date", e.target.value)}/>
      </div>

      {salesData.length === 0 ? (
        <p>No sales data available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-3 py-2">Date</th>
              <th className="border border-gray-300 px-3 py-2">Product</th>
              <th className="border border-gray-300 px-3 py-2">Number of Sales</th>
              <th className="border border-gray-300 px-3 py-2">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">{sale.date}</td>
                <td className="border border-gray-300 px-3 py-2">{sale.product}</td>
                <td className="border border-gray-300 px-3 py-2">{sale.qty}</td>
                <td className="border border-gray-300 px-3 py-2">₹{sale.amount}</td>
              </tr>
            ))}

            {/* ✅ Totals Row */}
            <tr className="bg-gray-100 font-bold">
              <td className="border border-gray-300 px-3 py-2 text-right" colSpan={2}>
                TOTAL
              </td>
              <td className="border border-gray-300 px-3 py-2">{totalQty}</td>
              <td className="border border-gray-300 px-3 py-2">₹{totalAmount}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReport;
