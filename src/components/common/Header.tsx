import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { logOut } from "../../redux/features/userAuth/userAuthSlice";
import { AppDispatch, RootState } from "../../redux/store";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const user = JSON.parse(localStorage.getItem("loginuser") || "[]");
  const user:any = useSelector((state: RootState)=>state.userAuth.login);
  console.log(user);
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/signin");
    localStorage.removeItem("loginuser");
    dispatch(logOut());
  };
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="container mx-auto px-4 py-3 lg:py-5">
        <div className="flex items-center justify-between">
          <NavLink
            className="flex items-center justify-center gap-2"
            to="/"
          >
            <img className="w-10 rounded-full" src={logo} alt="logo" />
            <h3 className="text-white text-lg font-semibold">PokePedia</h3>
          </NavLink>
          <nav className=" flex items-center justify-center lg:flex gap-6 text-white font-medium">
            <NavLink to="/" className="text-white">
              Home
            </NavLink>
            <NavLink to="/favorite" className="text-white">
              Favorites
            </NavLink>
            {!user && (
              <NavLink to="/signin" className="text-white">
                Login
              </NavLink>
            )}

            {user && (
              <>
                <div className="relative inline-block z-50 text-left border border-slate-200  rounded-full px-2 py-1">
                  {user?.email}
                </div>
                <button
                  className="h-full flex main-link items-center gap-2 border border-slate-200  rounded-full px-2 py-1"
                  onClick={handleLogOut}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <p className="text-White max-sm:hidden">LogOut</p>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
