import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { institutions, InstitutionList, ClubList } from "../Institutions"; // Update the path as needed
import "../../assets/KEC_BG.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    institution: "",
    department: "",
    password: "",
    cpassword: "",
    adminKey: "",
    rollno: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const PostData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {
      name,
      email,
      phone,
      userType,
      institution,
      department,
      adminKey,
      password,
      cpassword,
      rollno,
    } = user;

    try {
      await axios.post(
        `https://event-management-react-1.onrender.com/register`,
        {
          name,
          email,
          phone,
          userType,
          institution,
          department,
          adminKey,
          password,
          cpassword,
          rollno,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      toast.success("Sign Up Successfull!");

      navigate("/login");
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        setIsLoading(false);
        const data = error.response.data;
        setAuthStatus(data.error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="text-gray-600 body-font my-10  min-h-screen flex items-center justify-center bg-white relative">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("KEC_BG.jpg")',
              filter: "blur(3px)",
            }}
          ></div>
          <div className="lg:w-2/6 md:w-1/2 my-10 bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0 relative z-10">
            <form method="POST">
              <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Sign <span style={{ color: "#6d7f69" }}>Up</span>
              </h3>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={user.name}
                  onChange={handleInputs}
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
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
                  value={user.email}
                  onChange={handleInputs}
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  value={user.phone}
                  onChange={handleInputs}
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="userType"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Your Role
                </label>

                <select
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="userType"
                  name="userType"
                  value={user.userType}
                  onChange={handleInputs}
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="faculty">Club Member</option>
                  <option value="admin">Admin</option>
                  {"true" === "true" && <option value="hod">Club Head</option>}

                </select>
              </div>
              {user.userType === "admin" ? (
                <>
                  <div className="relative mb-4">
                    <label
                      htmlFor="adminKey"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                    >
                       Admin Key
                    </label>
                    <input
                      type="text"
                      required
                      value={user.adminKey}
                      onChange={handleInputs}
                      id="adminKey"
                      name="adminKey"
                      placeholder="adminKey"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </>
                ) : user.userType === "student" ? (
                  <>
                     <div className="relative mb-4">
                    <label
                      htmlFor="rollno"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                    >
                      Roll No
                    </label>
                    <input
                      type="text"
                      required
                      value={user.rollno}
                      onChange={handleInputs}
                      id="rollno"
                      name="rollno"
                      placeholder="Roll No"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  
                  {/* Department Dropdown */}
                  {user.institution && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      >
                        ClubList
                      </label>
                      <select
                        value={user.department}
                        onChange={handleInputs}
                        id="department"
                        name="department"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      >
                        <option value="">Select</option>
                        {institutions
                          .find(
                            (inst) =>
                              inst.name === InstitutionList[user.institution]
                          )
                          ?.departments.map((dept, index) => (
                            <option
                              key={index}
                              value={Object.keys(ClubList).find(
                                (key) => ClubList[key] === dept
                              )}
                            >
                              {dept}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  </>
              ) : (
                <>
                  {/* Institution Dropdown */}
                  <div className="relative mb-4">
                    <label
                      htmlFor="institution"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                    >
                      Institution
                    </label>
                    <select
                      value={user.institution}
                      onChange={handleInputs}
                      id="institution"
                      name="institution"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                      <option value="">Select</option>
                      {Object.keys(InstitutionList).map((key) => (
                        <option key={key} value={key}>
                          {InstitutionList[key]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Department Dropdown */}
                  {user.institution && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      >
                        ClubList
                      </label>
                      <select
                        value={user.department}
                        onChange={handleInputs}
                        id="department"
                        name="department"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      >
                        <option value="">Select</option>
                        {institutions
                          .find(
                            (inst) =>
                              inst.name === InstitutionList[user.institution]
                          )
                          ?.departments.map((dept, index) => (
                            <option
                              key={index}
                              value={Object.keys(ClubList).find(
                                (key) => ClubList[key] === dept
                              )}
                            >
                              {dept}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* 

                  )} */}
                </>
              )}
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Password
                </label>
                <input
                  required
                  value={user.password}
                  onChange={handleInputs}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="cpassword"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Confirm Password
                </label>
                <input
                  required
                  value={user.cpassword}
                  onChange={handleInputs}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>
              <div className="mx-auto w-fit">
                <div className="mx-auto">
                  <button
                    type="submit"
                    onClick={PostData}
                    className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-800 rounded text-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-m">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    {" "}
                    Login
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

export default Signup;
