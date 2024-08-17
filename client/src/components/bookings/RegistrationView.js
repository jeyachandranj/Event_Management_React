import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
const RegistrationView = () => {
  const [eventRegistrationData, setEventRegistrationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bookingId } = useParams();
  const location = useLocation();
    const { eventName } = location.state;
  const getEventRegistrationData = async () => {
    try {
      const response = await axios.get(
        `https://event-management-react-1.onrender.com/getRegistration/${bookingId}`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("data", data);
      setEventRegistrationData(data.eventRegister);

      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getEventRegistrationData();
  }, []);

  

  const updateBooking = async (bookingId, isApproved) => {
    setIsLoading(true);

    try {
      const response = await axios.put(`https://event-management-react-1.onrender.com/eventRegisterEdit/${bookingId}`, {
        status: isApproved,
      }, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      getEventRegistrationData();
      
      // const data = response.data;
      //consolelog(data);


      // setBookingData(data.bookings);
    
      // setIsLoading(false);
      toast.success(`Request ${isApproved} Successfull!`)

      if (response.status !== 200) {

        throw new Error(response.error);
      }
    } catch (error) {

      //consolelog(error);
      // navigate("/login");
    }
  };

  const ParticipationUpdate = async (bookingId, isApproved) => {
    setIsLoading(true);

    try {
      const response = await axios.put(`https://event-management-react-1.onrender.com/eventparticipation/${bookingId}`, {
        Participationstatus: isApproved
      }, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      getEventRegistrationData();
      
      // const data = response.data;
      //consolelog(data);


      // setBookingData(data.bookings);
    
      // setIsLoading(false);
      toast.success(`Request ${isApproved} Successfull!`)

      if (response.status !== 200) {

        throw new Error(response.error);
      }
    } catch (error) {

      //consolelog(error);
      // navigate("/login");
    }
  };
 console.log("eventRegistrationData",eventRegistrationData);

 const convertToCSV = () => {
  if (Array.isArray(eventRegistrationData)) {
    return eventRegistrationData.map((booking) => ({
      "Student Name": booking.name,
      "Phone Number": booking.phone,
      Email: booking.email,
      Department: booking.department,
      "Roll No": booking.rollno,
      "Registration Amount": booking.regamt,
      "Payment Date": new Date(booking.createdAt).toLocaleDateString(),
      "Payment status": booking.status,
      "Participation status": booking.Participationstatus,
    }));
  } else if (typeof eventRegistrationData === 'object' && eventRegistrationData !== null) {
    // Handle object case
    return [{
      "Student Name": eventRegistrationData.name,
      "Phone Number": eventRegistrationData.phone,
      Email: eventRegistrationData.email,
      Department: eventRegistrationData.department,
      "Roll No": eventRegistrationData.rollno,
      "Registration Amount": eventRegistrationData.regamt,
      "Payment Date": new Date(eventRegistrationData.createdAt).toLocaleDateString(),
      "Payment status": eventRegistrationData.status,
      "Participation status": eventRegistrationData.Participationstatus,
    }];
  } else {
    return []; // Return empty array if data is not in expected format
  }
};



  return (
    <>
      <div className="mt-6 min-h-screen">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
         {eventName} Event<span style={{ color: "#6d7f69" }}> Registration Details</span>{" "}
        </h1>
        <CSVLink
            data={convertToCSV()}
            filename={"event_registration_data.csv"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-auto mr-4 inline-flex items-center"
            style={{"marginLeft":"1450px","backgroundColor":"#6d7f69"}}
            target="_blank"
          >
            Download CSV
          </CSVLink>

        {/* 
          <div className="flex flex-wrap my-8 justify-center">
          <button
            className={`rounded-full px-4 py-2 mx-4  focus:outline-none ${filterValue === "all" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Request Sent" ? "bg-indigo-100 text-indigo-800 " : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("Request Sent")}
          >
            Pending
          </button>
          
        {"true" === "true" &&
        <div>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By HOD" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("Approved By HOD")}
          >
            Forwarded To Admin
          </button>
            

          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Rejected By HOD" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800   hover:bg-gray-100"}`}
            onClick={() => handleFilter("Rejected By HOD")}
          >
            Rejected By Club Head
          </button>
          </div>
           }
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By Admin" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("Approved By Admin")}
          >
            Approved By Admin
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Rejected By Admin" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800   hover:bg-gray-100"}`}
            onClick={() => handleFilter("Rejected By Admin")}
          >
            Rejected By Admin
          </button>
        </div> */}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="container w-full px-4 mx-auto sm:px-8 ">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 ">
              <div className="inline-block min-w-full border overflow-hidden rounded-lg  shadow-xl shadow-blue-100 ">
                <table className="min-w-full leading-normal    ">
                  <thead>
                    <tr className="bg-gray-200 border-gray-500  leading-normal  text-center">
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Student Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase  border-gray-200"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Department
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Roll No
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Registration Amount
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Payment Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Payment status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                       Participation status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
                      >
                        Action
                      </th>
                      {/* <th scope="col" className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                      Event Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200">
                      Actions
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(eventRegistrationData) &&
                    eventRegistrationData.length > 0 ? (
                      eventRegistrationData.map((booking) => (
                        // <div key={booking._id} className="my-2 ">

                        <tr
                          key={booking._id}
                          className="border-gray-200 text-center border-b-2  "
                         >
                          <td className="px-5 py-5 font-bold text-m  bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.phone}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.email}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.department}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.rollno}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.regamt}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.status}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <button
                              onClick={() => updateBooking(booking._id, "Payment Success")} className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">Approve</button>
                            <button
                              onClick={() => updateBooking(booking._id, "Payment Failed")} className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">Reject</button>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.Participationstatus}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-m bg-white  border-gray-200">
                            <button
                              onClick={() => ParticipationUpdate(booking._id, "Participation")} className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none">Approve</button>
                            <button
                              onClick={() => ParticipationUpdate(booking._id, "Not Participation")} className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none">Reject</button>
                          </td>
                          {/* <td className="px-5 py-5 text-m bg-white  border-gray-200">

                         {booking.eventDateType === "multiple" ? 
                          <p className="text-gray-900 whitespace-no-wrap ">
                            {format(new Date(booking.eventStartDate), "EEEE dd-MM-yyyy")}
                            <br/>To<br/>
                            {format(new Date(booking.eventEndDate), "EEEE dd-MM-yyyy")}

                          </p>

                          :
                          <p className="text-gray-900 whitespace-no-wrap">
                            {format(new Date(booking.eventDate), "EEEE dd-MM-yyyy")}
                          </p>

                          }
                         </td> */}
                        </tr>
                        // </div>
                      ))
                    ) : (
                      <tr className="border-gray-200 border-b justify-center">
                        <td
                          className="px-5 py-5 font-bold text-m bg-white border-gray-200 text-center"
                          colSpan="7"
                        >
                          <p className="text-gray-900 whitespace-no-wrap">
                            No Bookings Requests found.
                          </p>
                        </td>
                      </tr>

                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegistrationView;
