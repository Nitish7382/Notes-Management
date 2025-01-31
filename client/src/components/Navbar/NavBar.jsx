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
     <h5 className="text-3xl font-bold text-blue-700 flex items-center">
               <FaStickyNote className="mr-3 text-blue-600" /> NoteNexus
             </h5>

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
