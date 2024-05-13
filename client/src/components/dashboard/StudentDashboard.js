import React from "react";
import ClubDetails from "../bookings/ClubDetails";

const StudentDashboard = () => {
  return (
    <>
    <div className="mt-6 min-h-screen" style={{backgroundColor:"lightgray"}}>
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Student <span style={{ color: "#6d7f69" }}> Dashboard</span>{" "}
        </h1>
        <div className="mt-6 grid grid-flow-col col-auto	">
          <div>
            <ClubDetails />
          </div>
        </div>
    </div>
    </>
  );
};

export default StudentDashboard;
