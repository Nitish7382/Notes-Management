import React,{useState} from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Passwordinput from "../../components/Input/Passwordinput";
import {validateEmail} from "../../utils/helper";
import axiosInstance  from "../../utils/axiosinstance"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid Email");
      return;
    }

    if(!password){
      setError("Please enter a password");
      return;
    }

    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password,
      });

      //handle successfully login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response && error.response.data.messege) {
        setError(error.response.data.messege);
      } else{
        setError("An unexpected Error. Please try again");
      }
    }


  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border-2 bg-white px-7 py-10 rounded-xl">
          <form onSubmit={handleLogin}>
            <h3 className="text-2xl mb-7">Login</h3>
            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className="input-box" />

            <Passwordinput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not Registered Yet?{" "}
              <Link
                to="/SignUp"
                className=" text-blue-600 underline font-medium"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
