import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import QRCode from "qrcode.react";
import "./App1.css"

import { ClubList, InstitutionList } from "../Institutions";
const BookingEvent = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({ transactionId: "" });
  const [bookingData, setBookingData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  const closeModal = () => {
    setShowModal(false);
    setRejectionReason("");
  };

  const getbookingById = async () => {
    try {
      const response = await axios.get(
        `https://event-management-react-1.onrender.com/bookingsView/${bookingId}`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.booking;
      console.log("bookingdata",data);
      setBookingData(data);
      setIsLoading(false);
      console.log("booking id ",bookingId);
    } catch (error) {
      navigate("/");
      //consoleerror(error);
    }
  };

  const callAboutPage = async () => {
    try {
      const response = await axios.get(`https://event-management-react-1.onrender.com/about`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      //consolelog(data);
      setUserData(data);
      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: "Unauthrized",
        });
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  //consolelog(bookingData);

  const updateBooking = async (bookingId, isApproved) => {
    if (isApproved === "Rejected By Admin") {
      if (rejectionReason.trim() === "") {
        toast.error("Please provide a reason for rejection.");
        return;
      } else {
        setRejectionReason(null);
      }
    }
    setIsLoading(true);
    //consolelog(isApproved);
    try {
      const response = await axios.put(
        `https://event-management-react-1.onrender.com/bookingsEdit/${bookingId}`,
        {
          isApproved: isApproved,
          rejectionReason:
            isApproved === "Approved By Admin" ? null : rejectionReason,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // const data = response.data;
      //consolelog(data);
      closeModal();
      getbookingById();

      toast.success(`Request ${isApproved} Successfull!`);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      //consolelog(error);
    }
  };


  const handleTransactionIdChange = (e) => {
    setUserData({ ...userData, transactionId: e.target.value });
  };

  const UPIID = bookingData.upiId;

  const generateUpiPaymentUrl = () => {
    return `upi://pay?pa=${UPIID}&pn=Recipient&tn=Payment%20for%20your%20order&am=${bookingData.regamt}&cu=INR`;
    // Replace '100' with the actual amount
  };

  console.log("userdata", userData);

  useEffect(() => {
    getbookingById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EventRegister = async (e) => {
    e.preventDefault();
    // setShowModal(false)
    setIsLoading(true);
    const { name, email, department, institution, phone, transactionId ,rollno} =
      userData;
    const {eventName,regamt} = bookingData;
    const createdAt = new Date();
    const bookingHallId = bookingId;
    const status = "Payment pending";
    const Participationstatus = "Not Participation"

    console.log("bookinghallid",bookingId);
    try {
      const response = await axios.post(
        `https://event-management-react-1.onrender.com/eventregister`,
        {
          name,
          email,
          department,
          institution,
          phone,
          transactionId,
          bookingHallId,
          rollno,
          status,
          Participationstatus,
          eventName,
          regamt,
          createdAt
        },

        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        
      const data = response.data;

      if (data.message === "EventRegister  successfully") {
        toast.success("Event created successfully!");
      } else {
        toast.error("Request not sent!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const data = error.response.data;
          if (data && data.error) {
            const errorMessage = data.error;
            toast.error(errorMessage);
          }
        } else if (error.response.status === 403) {
          toast.error("Unauthorized request!");
        } else {
          console.error(error);
          toast.error("An error occurred while creating the booking.");
        }
      } else {
        console.error(error);
        toast.error("An error occurred while creating the booking.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log("bbb",bookingData);

  const institutionName =
    InstitutionList[bookingData.institution] || bookingData.institution;
    let departmentName = ClubList[bookingData.department] || bookingData.department;
    if (userData.rollno && userData.rollno.length >= 4) {
      const departmentCode = userData.rollno.substr(2, 2).toUpperCase(); // Convert to uppercase
      switch (departmentCode) {
        case "AL":
          departmentName = "AIML";
          break;
        case "AD":
          departmentName = "AIDS";
          break;
        case "CS":
          departmentName = "CSE";
          break;
        case "IT":
          departmentName = "IT";
          break;
        case "EC":
          departmentName = "ECE";
          break;
        case "EE":
          departmentName = "EEE";
          break;
        case "CH":
          departmentName = "CHEM";
          break;
        case "FT":
          departmentName = "FT";
          break;
        case "EI":
          departmentName = "EIE";
          break;
        case "CD":
          departmentName = "CSD";
          break;
        case "ME":
          departmentName = "MECH";
          break;
        case "CI":
          departmentName = "CIVIL";
          break;
        // Add more cases as needed
        default:
          departmentName = ClubList[bookingData.department] || bookingData.department;
      }
    }
    const price = bookingData.regamt;
console.log("price", price);

const [book, setBook] = useState({
  name: "Event Payment",
  img: "https://payu.in/blog/wp-content/uploads/2022/09/online-payments.png",
  price: 100, 
});
  
    const initPayment = (data) => {
      const options = {
        key: "rzp_test_glNCOpCuIgvwcY",
        amount: data.amount,
        currency: data.currency,
        name: book.name,
        description: "Test Transaction",
        image: book.img,
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyUrl = "https://event-management-react-1.onrender.com/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
  
    const handlePayment = async () => {
      try {
        const orderUrl = "https://event-management-react-1.onrender.com/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: book.price });
        console.log(data);
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                Event Registration
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Registration For{" "}
                <span className="text-indigo-600">
                  {bookingData.eventName}{" "}
                </span>
              </h3>
            </div>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-event-manager"
                  >
                    Your Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-manager"
                  >
                    {userData.name}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-event-name"
                  >
                    Email Id
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-name"
                  >
                    {userData.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-organizing-club"
                  >
                    Department
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-organizing-club"
                  >
                    {departmentName}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-phone-number"
                  >
                    Institution
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >
                    {bookingData.institution} - {institutionName}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-phone-number"
                  >
                    Phone Number
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >
                    {userData.phone}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-phone-number"
                  >
                    event Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >
                    {bookingData.eventName}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-transaction-id"
                  >
                    Transaction ID
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-transaction-id"
                    type="text" 
                    value={userData.transactionId} 
                    onChange={handleTransactionIdChange}
                    placeholder="Enter Transaction ID"
                  />
                  {/* Optionally, you can include validation error messages here */}
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    htmlFor="grid-phone-number"
                  >
                    Registration Amount
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >
                    {bookingData.regamt}
                  </p>
                  {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <h2
                    style={{
                      fontSize: "24px",
                      color: "#333",
                      marginBottom: "10px",
                      animation: "slideIn 1s ease",
                      marginLeft: "300px",
                    }}
                  >
                    Generated QR Code:
                  </h2>
                  <div
                    style={{
                      border: "4px solid #f00",
                      borderRadius: "10px",
                      padding: "20px",
                      display: "inline-block",
                      backgroundColor: "rgba(255, 0, 0, 0.1)",
                      animation: "rotate 3s linear infinite",
                      marginLeft: "300px",
                    }}
                  >
                    <QRCode value={generateUpiPaymentUrl()} />
                  </div>
                </div>
                
              </div>
              <div style={{"marginLeft":"400px"}}>
                  <h1>(OR)</h1>
                </div>
                    <div className="App">
            <div className="book_container">
              <img src={book.img} alt="book_img" className="book_img" />
              <p className="book_name">{book.name}</p>
              <p className="book_author">By {book.author}</p>
              <p className="book_price">
                Price : <span>&#x20B9; {book.price}</span>
              </p>
              <button onClick={handlePayment} className="buy_btn">
                Pay Now
              </button>
            </div>
          </div>
              <div>
                <button
                  style={{
                    backgroundColor: "#6d7f69" ,
                    border: "none",
                    color: "white",
                    padding: "15px 32px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transitionDuration: "0.4s",
                    animation: "rainbow 5s infinite",
                    marginLeft:"320px"
                  }}
                  onClick={EventRegister}
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Reason for Rejection</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Enter reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                // onClick={handleReject}
                onClick={() =>
                  updateBooking(bookingData._id, "Rejected By Admin")
                }
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};
export default BookingEvent;
