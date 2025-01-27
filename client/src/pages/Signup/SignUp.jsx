import React, { useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Passwordinput from "../../components/Input/Passwordinput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name){
      setError("please enter your Full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid Email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");
    //SignUp API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //handle successfully registeration response
      if (response.data && response.data.error) {
        setError(response.data.messege)
        return
      }


      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response && error.response.data.messege) {
        setError(error.response.data.messege);
      } else {
        setError("An unexpected Error. Please try again");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border-2 bg-white px-7 py-10 rounded-xl">
          <form onSubmit={handleSignUp}>
            <h3 className="text-2xl mb-7">Signup</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="input-box"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-box"
            />

            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn-primary">
              Signup
            </button>

            <p className="text-sm text-center mt-4">
              Already Registerd{" "}
              <Link
                to="/Login"
                className=" text-blue-600 underline font-medium"
              >
                Click here to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
