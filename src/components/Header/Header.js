import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../Images/icon.png";

import { useDispatch } from "react-redux";
import { formToggleSliceActions } from "../../store/FormToggleSlice";
import { authSliceActions } from "../../store/AuthSlice";
import { useHistory } from "react-router-dom";
import "./Header.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  const toggleModal = (e) => {
    dispatch(formToggleSliceActions.toggleModal());
    setShowList((prev) => !prev)
  };
  const toggleList = (e) => {
    setShowList((prev) => !prev);
  };
  
  const logoutHandler = (e) => {
    dispatch(authSliceActions.logout())
    setShowList((prev) => !prev)

  }

  const goToHome = (e) => {
    history.push("/");
  };
  const authStatus = useSelector((state) => state.authData.authState)
  console.log(authStatus)
  return (
    <div className="header">
      <div className="nav-list">
        <img src={logo} onClick={goToHome} alt="Hotstar logo" />
        <MenuIcon className="menu" onClick={toggleList} />
        <div className={`list ${showList ? "show" : ""}`}>
          <NavLink to="/movies" onClick={toggleList}>Movies </NavLink>
          <NavLink to="/series" onClick={toggleList}>Series </NavLink>
         
          {!authStatus.status ? ( <button onClick={toggleModal} className="login-btn2">
          Login
        </button>) : ( <button onClick={logoutHandler} className="login-btn2">
          Logout
        </button>)}
        </div>
      </div>
      <div className="header-section-2">
        <SearchBar />
        {!authStatus.status ? ( <button onClick={toggleModal} className="login-btn1">
          Login
        </button>) : ( <button onClick={logoutHandler} className="login-btn1">
          Logout
        </button>)}
       
      </div>
    </div>
  );
};

export default Header;
