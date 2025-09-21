import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
        return <div>
        <header className="bg-red-600 text-white py-4 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sparkz 🎆</h1>
            <nav>
                <ul className="flex gap-6">
                <li className="hover:underline cursor-pointer" onClick={()=>navigate("/")}>Home</li>
                <li className="hover:underline cursor-pointer" onClick={()=>navigate("/report")} >Report</li>
                <li className="hover:underline cursor-pointer">Contact</li>
                </ul>
            </nav>
            </div>
        </header>
    </div>
}

export default Header;