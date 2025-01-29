import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/NavBar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Emptycard from "../../components/Empty Card/Emptycard";
import AddNoteSvg from "../../assets/Empty.svg";


const Dashboard = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch,setIsSearch] = useState(false);

  const navigate = useNavigate();
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error");
    }
  };

  //Delete Note
  const deletenote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        getAllNotes();
        toast.warning("Note deleted successfully!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.messege || "Something went wrong!";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  //Search for a note
  const  onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes",{
        params:{query},
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error) 
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  } 

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className="container mx-auto px-4 py-4">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deletenote(item)}
                OnPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <Emptycard
            imgSrc={AddNoteSvg}
            messege="Start creating your First note! Click the 'Add' button to write your 
            thoughts, ideas, reminders. Let get Started"
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] h-10 w-10 text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundcolor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-7 border"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          handleClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default Dashboard;
