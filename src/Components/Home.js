import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header"
const Home = () => {
    return <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <Header />

        {/* Dashboard */}
        <Outlet />
      </div>
}
export default Home;