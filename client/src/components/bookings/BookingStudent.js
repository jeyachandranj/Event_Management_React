import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { saveAs } from "file-saver"; 
import { PDFDocument, rgb } from 'pdf-lib';


const BookingStudent = () => {
    console.log("welcome");
  const [eventRegistrationData, setEventRegistrationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getEventRegistrationData = async () => {
    try {
      const response = await axios.get(
        `https://event-management-react-1.onrender.com/getStudentRegistration`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("student data", data);
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
  console.log("getEventRegistrationData",eventRegistrationData);

  const capitalize = (str, lower = false) => {
    if (typeof str !== 'string') return ''; // Ensure `str` is a string
  
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );
  };

  const generatePDF = async (name,booking) => {
    console.log("booking",booking);
    try {
      const existingPdfBytes = await fetch('./cert.pdf').then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      firstPage.drawText(name, {
        x: 200,
        y: 300,
        size: 28,
        color: rgb(0.2, 0.84, 0.67),
      });

      firstPage.drawText(booking.eventName, {
        x: 450,
        y: 267,
        size: 28,
        color: rgb(0.2, 0.84, 0.67),
      });

      

      firstPage.drawText("I'HALTONS", {
        x: 190,
        y: 230,
        size: 25,
        color: rgb(0.2, 0.84, 0.67),
      });
      const dateParts = booking.createdAt.split('T');
      const date = dateParts[0];
      console.log("date",date);
      firstPage.drawText(date, {
        x: 550,
        y: 200,
        size: 20,
        color: rgb(0.2, 0.84, 0.67),
      });

      const pdfBytes = await pdfDoc.save();

      const file = new File([pdfBytes], 'Certificate.pdf', {
        type: 'application/pdf;charset=utf-8',
      });

      saveAs(file);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('studentEmail', booking.email); // Assuming student's email is available in the booking object
      formData.append('memberEmail', 'j.jeyachandran072@gmail.com'); // Replace with the member's email address
      formData.append('file', file);
  
      await axios.post('https://event-management-react-1.onrender.com/send-email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error generating certificate:', error);
      console.error('Error generating or sending email:', error);
    }
  };

  
  const handleGenerateCertificate = (booking) => {
    const val = capitalize(booking.name);
    
    if (val.trim() !== '') {
      generatePDF(val,booking);
    } else {
      // Handle invalid input
    }
  };
 
  return (
    <>
      <div className="mt-6 min-h-screen" style={{backgroundColor:"lightgray"}}>
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Event<span style={{ color: "#6d7f69" }}> Registration Details</span>{" "}
        </h1>

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
                        Event Name
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
                       Participation status
                      </th>
                      <th>Action</th>
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
                              {booking.eventName}
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
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.Participationstatus}
                            </p>
                          </td>
                          <td>
                            <button onClick={() => handleGenerateCertificate(booking)}>Get Certificate</button>
                           </td>
                          
                          
                        </tr>
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

export default BookingStudent;
