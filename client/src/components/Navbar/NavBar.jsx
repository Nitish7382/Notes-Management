import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/Login");
  };

  const handleSearch = () => {
    console.log("searching");
  };


  const handleClearSearch = () => { 
    setSearchQuery("");
  };

  return (
    <div className=" bg-white flex items-center justify-between px-6 py-4 drop-shadow-md">
      <h2 className=" text-xl font-medium text-black py-2">Notes Management</h2>

      <SearchBar 
      value={searchQuery}
      onChange={({target})=>{
        setSearchQuery(target.value);
      }} 

      handleSearch={handleSearch}
      onClearSearch={handleClearSearch}      
      />

      <ProfileInfo OnLogout={handlelogout} />
    </div>
  );
};

export default NavBar;
