import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({userInfo, onSearchNote, handleClearSearch}) => {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/Login");
  };

  const handleSearch = () => {
   if (searchQuery) {
    onSearchNote(searchQuery)
   }
  };


  const onClearSearch = () => { 
    setSearchQuery("");
    handleClearSearch();
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
      onClearSearch={onClearSearch}      
      />

      <ProfileInfo userInfo={userInfo} OnLogout={handlelogout} />
    </div>
  );
};

export default NavBar;
