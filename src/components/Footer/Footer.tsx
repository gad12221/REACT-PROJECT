import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function Footer() {
  const { toggle } = useContext(ThemeContext);
  return (
    <footer className="dark:bg-slate-700 bg-blue-400 p-5 text-white text-5xl font-extralight  text-center">
      Gadi's Project &copy; 2024


    </footer>
  );
}

export default Footer;