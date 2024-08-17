import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../../App";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import "../../assets/KEC_BG.jpg";

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");

  //   const loginUser = async (e) => {
  //     e.prevenDefault();

  //     const res = await fetch("http://localhost:9002/login", {
  //       method: "POST",
  //       credentials: 'include',
  //       headers: {
  //         "Content-Type": "application/json",

  //       },
  //       body: JSON.stringify({
  //         email,

  //         password,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (res.status === 400 || !data) {
  //       window.alert("invalid credentials");
  //     } else {
  //       window.alert("Login Successfull");
  //       navigate("/login");
  //     }
  //   };

  const loginUser = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://event-management-react-1.onrender.com/login",
        {
          //const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      //consolelog(data.userLogin);
      //consolelog(data.token);

      // sessionStorage.setItem("jwtoken", data.token);
      // document.cookie = `jwtoken=${data.token}; expires=${new Date(Date.now() + 9000000)}; path=/`;
      // document.cookie = `jwtoken=${data.token}; expires=${new Date(Date.now() + 9000000)}; path=/; `
      // domain=.onrender.com`;

      // Cookies.set("jwtoken", data.token, { expires: new Date(Date.now() + 9000000), path: "/" });

      localStorage.setItem("jwtoken", data.token);
      // if (response.status === 400 || !data) {
      //   setAuthStatus("Invalid credentials");
      //   window.alert("invalid")
      // } else {

      dispatch({ type: "USER", payload: true });

      if (data.userLogin.userType === "admin") {
        dispatch({ type: "USER_TYPE", payload: "admin" });
      } else if (data.userLogin.userType === "hod") {
        dispatch({ type: "USER_TYPE", payload: "hod" });
      } else if (data.userLogin.userType === "faculty"){
        dispatch({ type: "USER_TYPE", payload: "faculty" });
      } else{
        dispatch({ type: "USER_TYPE", payload: "student"});
      }

      localStorage.setItem("userId", data.userLogin._id);
      toast.success("Login Successfull");
      setIsLoading(false);

      navigate("/");
      // }
    } catch (error) {
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        setIsLoading(false);
        setAuthStatus(data.error);
        //consolelog(data.error)
        // window.alert(data.error);
      } else {
        setAuthStatus("Something Went Worng");
        //consolelog(error)
      }
      // //consolelog(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="text-gray-600 body-font min-h-screen flex items-center justify-center bg-white relative">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("KEC_BG.jpg")',
              filter: "blur(3px)",
            }}
          ></div>
          <div className="lg:w-2/6 md:w-1/2  bg-white shadow-2xl shadow-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0 relative z-10">
            <form method="POST">

              <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Sign <span style={{ color: "#6d7f69" }}>In</span>
              </h3>

              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Password
                </label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>

              <div className="my-4">
                <Link
                  to="/passwordReset"
                  className=" text-m font-bold  hover:underline"
                >
                  Forgot Your Password?
                </Link>
              </div>

              <div className="mx-auto w-fit">
                <div className="mx-auto">
                  <button
                    type="submit"
                    onClick={loginUser}
                    className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-800 rounded text-lg"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-m">
                  Don't have an account yet?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    {" "}
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
