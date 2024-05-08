import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { FaBars, FaHome, FaSearch } from "react-icons/fa";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { RxAvatar } from "react-icons/rx";
import { FaXmark } from "react-icons/fa6";
import { CardType } from "../../@types/types";
import Search2 from "../Header/Search2";
import { showErrorDialog, showSuccessDialog } from "../../UI/dialogs";

const Navbar = () => {
  const { isLoggedIn, isBusiness, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ifOpenMenu, SetIfOpenMenu] = useState(false);

  const toggleMenu = () => {
    SetIfOpenMenu(!ifOpenMenu);
    if (!ifOpenMenu) {
      setTimeout(() => {
        SetIfOpenMenu(false);

      }, 10000)
    }
  }
  return (
    <nav className="site-navbar">
      <div className="nav-left">
        <NavLink to="/" className="brand">

          <FaHome />
        </NavLink>
        <h1 className="HStyle text-xl font-bold font-mono text-pink-200"><span className="text-pink-500">B</span>iz Cards</h1>
      </div>

      <div className="nav-right">
        <div className="hidden md:flex md:flex-row gap-4">
          {!isLoggedIn && <NavLink className={'navL'} to="/register">Register</NavLink>}
          {!isLoggedIn && <NavLink className={'navL'} to="/login">Login</NavLink>}
          {isLoggedIn && (
            <button className={'navL text-red-600  font-bold'}
              onClick={() => {
                logout();
                showSuccessDialog("Logout", "Logout successfully");
                navigate("/login");
              }}>Logout</button>
          )}
          <NavLink className={'navL'} to="/about">About</NavLink>
          {isLoggedIn && isBusiness && <NavLink className={'navL'} to="/createCard">Create Card
          </NavLink>}
          {isLoggedIn && isBusiness && <NavLink className={'navL'} to="/myCards">My Cards</NavLink>}

          {isLoggedIn && <NavLink className={'navL'} to='/MyFav'>Favor Cards</NavLink>}

          {isLoggedIn && isAdmin && <NavLink className={'navL'} to="/sandbox">Sandbox</NavLink>}


          {isLoggedIn && <NavLink className={'navL'} to="/profile"><RxAvatar /></NavLink>}
        </div>
        <DarkModeToggle />

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none focus:text-gray-300">
            {ifOpenMenu ? (<FaXmark className="w-6 h-6 text-black dark:text-white" />) : (<FaBars className="  w-6 h-6 text-black dark:text-white" />)}
          </button>
        </div>

      </div>
      {
        ifOpenMenu && (
          <div className="space-y-4 px-4 pt-3 pb-5 mx-2 rounded-md drop-shadow-md bg-stone-200 dark:bg-slate-500 fixed top-16 right-0 left-0 flex flex-col z-50 ">
            {isLoggedIn && <NavLink className={`dark:text-white text-orange-400`} to="/cards">Cards</NavLink>}
            {isLoggedIn && <NavLink className={`dark:text-white text-orange-400`} to="/favoritecards">Fav Cards</NavLink>}
            {isLoggedIn && isBusiness && (
              <>
                <NavLink className={`dark:text-white text-orange-400`} to="/mycards">My Cards</NavLink>
                <NavLink className={`dark:text-white text-orange-400`} to="/createcard">Create Card</NavLink>
                <NavLink className={`dark:text-white text-orange-400`} to="/profile">Profile</NavLink>
                <NavLink className={`dark:text-white text-orange-400`} to="/sandbox">Sandbox</NavLink>
              </>
            )}
            {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
            {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
            {isLoggedIn && <button className='text-red-600' onClick={() => {
              logout();
              navigate("/login")
            }}>Logout</button>}
          </div>
        )
      }

    </nav >
  );
};

export default Navbar;