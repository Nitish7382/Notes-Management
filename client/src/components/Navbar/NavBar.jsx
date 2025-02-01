import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { FaStickyNote } from "react-icons/fa";


const NavBar = ({userInfo, onSearchNote, handleClearSearch}) => {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/login");
  };

  const handlehome = ()=>{
    navigate("/")
  }

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
    <div className="bg-white flex items-center justify-between px-6 py-4 drop-shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <h5 onClick={handlehome} className="text-3xl font-bold text-blue-700 flex items-center cursor-pointer">
          <FaStickyNote className="mr-3 text-blue-600" /> NoteNexus
        </h5>
      </div>
  
      {/* Center Section - Search Bar */}
      <div className="flex-1 flex justify-center">
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>
  
      {/* Right Section - Profile Info */}
      <div className="flex items-center">
        <ProfileInfo userInfo={userInfo} OnLogout={handlelogout} />
      </div>
    </div>
  );
  
};

export default NavBar;
