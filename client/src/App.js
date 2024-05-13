import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
// importing components
import axios from "axios";
import Navbar from "./components/Navbar";
// import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";
import Halls from "./components/halls/Halls";
import BookingForm from "./components/bookings/BookingForm";
import BookingsAdmin from "./components/bookings/BookingsAdmin";
import BookingsHod from "./components/bookings/BookingsHod";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import FacultyDashboard from "./components/dashboard/FacultyDashboard";
import BookingFaculty from "./components/bookings/BookingsFaculty";
import StudentDashboard from "./components/dashboard/StudentDashboard"
import Footer from "./components/Footer";
import HallsAdmin from "./components/halls/HallsAdmin";
import { initialState, reducer } from "./reducer/UseReducer";
import BookingEvent from "./components/bookings/BookingEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HallsEdit from "./components/halls/HallsEdit";
import HallForm from "./components/halls/HallForm";
import HodDashboard from "./components/dashboard/HodDashboard";
import PasswordReset from "./components/auth/PasswordReset";
import CertificateGenerator from "./components/bookings/CertificateGenerator";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifySuccess from "./components/auth/VerifySuccess";
import Unauthorized from "./components/Unauthorized";
import BookingUpdateFrom from "./components/bookings/BookingUpdateForm";
import Events from "./components/bookings/Events";
import answer from "./components/bookings/answer";
import BookingsView from "./components/bookings/BookingView";
import RegistrationView from "./components/bookings/RegistrationView";
import { CalendarView } from "./components/CalendarView";
import BookingStudent from "./components/bookings/BookingStudent";
export const UserContext = createContext();
const App = () => {
  // useEffect(() => {
  // const token = Cookies.get("jwtoken");
  // const cookies = document.cookie.split("; ");
  // const tokenCookie = cookies.find(cookie => cookie.startsWith("jwtoken="));
  // const token = tokenCookie ? tokenCookie.split("=")[1] : null;
  // const token = document.cookie.split(";").find((c) => c.trim().startsWith("jwtoken="));
  const token = localStorage.getItem("jwtoken");

  //consolelog(token);
  // axios.defaults.headers.common["authorization"] = token.split("=")[1];;
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  // axios.defaults.headers["authorization"] = token;
  axios.defaults.withCredentials = true;
  // }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              state.userType === "admin" ? (
                <AdminDashboard />
              ) : state.userType === "faculty" ? (
                <FacultyDashboard />
              ) : state.userType === "hod" ? (
                <HodDashboard />
              ) : state.userType === "student" ? (
                <StudentDashboard />
              ) : (
                <Login />
              )
            }
          />

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/profile" element={<About />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route
            path="/forgotPassword/:id/:token"
            element={<ForgotPassword />}
          />
          <Route path="/events" element={<Events />} />
          <Route exact path="/bookingevent/:bookingId" element={<BookingEvent/>} />


          {/* <Route path="/passwordReset" element={<PasswordReset />} /> */}
          <Route path="/verifyEmail/:id/:token" element={<VerifySuccess />} />
          
          <Route
            path="/halls"
            element={state.userType === "admin" ? <HallsAdmin /> : <Halls />}
          />
          <Route
            exact
            path="/halls/:hallId/:hallName"
            element={
              state.userType === "admin" ? <HallsEdit /> : <Unauthorized />
            }
          />
          <Route
            exact
            path="/bookingsEdit/:bookingId"
            element={
              state.userType === "admin" ? (
                <BookingUpdateFrom />
              ) : "true" && state.userType === "hod" ? (
                <BookingUpdateFrom />
              ) : (
                <Unauthorized />
              )
            }
          />

          {/* <Route exact path="/bookings/:bookingId" element={state.userType === "admin" ? <BookingUpdateFrom/>  : state.userType === "hod" ? <BookingUpdateFrom/>  : <Unauthorized />} /> */}
          <Route
            path="/hallForm"
            element={
              state.userType === "admin" ? <HallForm /> : <Unauthorized />
            }
          />

          <Route
            path="/bookings"
            element={
              state.userType === "admin" ? (
                <BookingsAdmin />
              ) : state.userType === "faculty" ? (
                <BookingFaculty />
              ) : "true" && state.userType === "hod" ? (
                <BookingsHod />
              ) : (
                <Unauthorized />
              )
            }
          />
          <Route
            exact
            path="/bookingForm/:hallId/:hallName"
            element={<BookingForm />}
          />          
          {/* <Route path="/bookings" element={<Booking/>} /> */}
          <Route
            exact
            path="/bookingsView/:bookingId"
            element={<BookingsView />}
          />
          <Route
            exact
            path="/registrationview/:bookingId"
            element={<RegistrationView />}
          />
          <Route exact path="/bookingstudent" element={<BookingStudent />} />
          <Route exact path="/certificategenerator" element={<CertificateGenerator />} />
          <Route exact path="/answer" element={<answer />} />

        </Routes>

        <Footer />
      </UserContext.Provider>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
