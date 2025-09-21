import { useEffect, useState } from "react";
import { crackersData } from "../Utilities/constants";
import LeftDB from "./LeftDB";
import RightDB from "./RightDb";

const Dashboard = () => {
    const [crackers, setCrackers] = useState([]);
    const [defaultCrackers, setDefaultCrackers] = useState([]);
    useEffect(
        ()=>{
            setCrackers(crackersData);
            setDefaultCrackers(crackersData);
        },[]
    )
    return <div className="flex space-x-4 p-4 h-[100vh]">
      {/* Left Section */}
      <div className="w-[60%] overflow-y-auto border rounded-lg p-2 mt-12">
        <LeftDB crackers={crackers} setCrackers={setCrackers} defaultCrackers={defaultCrackers} />
      </div>

      {/* Right Section */}
      <div className="w-[40%] overflow-y-auto border rounded-lg p-2">
        <RightDB />
      </div>
    </div>
    
}
export default Dashboard;