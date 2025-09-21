import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to handle global keyboard shortcuts
 */
const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + H → Invoice History
      if (e.ctrlKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        navigate("/history");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
};

export default useKeyboardShortcuts;
