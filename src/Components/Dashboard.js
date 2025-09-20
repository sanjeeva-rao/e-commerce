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
    return <div className="mt-12 flex">
        <LeftDB crackers = {crackers} setCrackers = {setCrackers} defaultCrackers = {defaultCrackers}/>
        <RightDB />
    </div>
}
export default Dashboard;