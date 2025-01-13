import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    navigate("/Login");
  };

  return (
    <div className=" bg-white flex items-center justify-between px-6 py-4 drop-shadow-md">
      <h2 className=" text-xl font-medium text-black py-2">Notes Management</h2>

      <SearchBar/>

      <ProfileInfo OnLogout={handlelogout} />
    </div>
  );
};

export default NavBar;
