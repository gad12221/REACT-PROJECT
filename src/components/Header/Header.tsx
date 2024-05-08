import "./Header.scss";
import Navbar from "../Navbar/Navbar";
import { useContext, useState } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import { BiAdjust } from "react-icons/bi";

function Header() {

  return (
    <>
      <header className="dark:bg-slate-700 md:bg-blue-400 p-5 text-white text-5xl font-extralight  text-center bg-blue-400 ">
        <Navbar />
      </header>

    </>
  );
}

export default Header;