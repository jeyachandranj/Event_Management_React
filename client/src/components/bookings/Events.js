import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { format, parseISO } from "date-fns";
import {  differenceInMilliseconds } from "date-fns";
import { ClubList } from "../Institutions";
import "../../hallbook.css";
import Popup from "./popup"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CertificateGeneration from "./CertificateGenerator";

const Events = () => {
  // const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [showCertificate, setShowCertificate] = useState(false);

  const handleButtonClick = () => {
    setShowCertificate(true);
  };

  const navigate = useNavigate();


  const handleViewClick = (bookingId) => {
    navigate(`/bookingevent/${bookingId}`);
  };

  const handleNavigate = () => {
    // Navigate to the desired page passing eventData as a parameter
    navigate('/certificategenerator', { state: { eventData } });
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let CulturalName = searchParams.get("CulturalName");
  if (!CulturalName) {
    CulturalName = "All Cultural";
  }

  const getEventData = async () => {
    try {
      const response = await axios.get(`https://event-management-react-1.onrender.com/events`, {
        // withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = response.data.bookings;
      //consolelog(data);

      const sortedEventData = data.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setEventData(sortedEventData);

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {}
  };


  useEffect(() => {
    getEventData();
    const intervalId = setInterval(() => {
      setEventData((prevEventData) => prevEventData.map(event => ({...event, countdown: calculateCountdown(event.eventDate)})));
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);

  const calculateCountdown = (eventDate) => {
    const currentDate = new Date();
    const timeDifference = differenceInMilliseconds(new Date(eventDate), currentDate);
    if (timeDifference <= 0) {
      return "Event has passed";
    }
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const filteredEventData = eventData.filter((event) => {
    const eventDate = new Date(event.eventDate);
    const currentDate = new Date();
    return eventDate >= currentDate && (eventTypeFilter === "all" || event.eventType === eventTypeFilter);
  });

  return (
    <>
      <div className="mt-6 min-h-screen relative">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center w-50"
          style={{
            backgroundImage: 'url("event_bg.jpeg")',
            backgroundAttachment: "fixed",
          }}
        >
          <button
            className={`mx-2`}
            style={{
              backgroundColor: '#6d7f69',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              margin: '0 8px',
            }}
            onClick={() => setEventTypeFilter("all")}
          >
            All
          </button>
          <button
            className={`mx-2`}
            style={{
              backgroundColor: '#6d7f69',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => setEventTypeFilter("technical")}
          >
            Technical
          </button>
          <button
            className={`mx-2`}
            style={{
              backgroundColor: '#6d7f69',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => setEventTypeFilter("non-technical")}
          >
            Non-Technical
          </button>
          <button
            className={`mx-2`}
            style={{
              backgroundColor: '#6d7f69',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => setEventTypeFilter("workshop")}
          >
            Workshop
          </button>
          <button onClick={handleButtonClick}>VOICE</button>
      {showCertificate && <CertificateGeneration eventData={eventData} />}

      {/* Display the navigation button */}
      <button onClick={handleNavigate}>Show Event Rules</button>
        </div>
        <br></br>
        <br></br>
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10 relative z-10">
          Upcomming<span style={{ color: "#6d7f69" }}> Events </span> for{" "}
          {CulturalName}
        </h1>
      
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredEventData.length ? (
          filteredEventData.map((event) => (
            <>
              {"All Cultural" === CulturalName ||
              event.organizingClub === CulturalName ? (
                <>
                  <div
                    key={event._id}
                    className="flex flex-col justify-center items-center my-10 "
                  >
                    <div className="relative flex flex-col items-center  mx-auto  rounded-xl p-8 md:w-8/12 lg:w-10/12 bg-white">
                      <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{
                          backgroundImage: 'url("event_card_2.jpeg")',
                        }}
                      ></div>
                      <div className="mt-8 mb-8 w-full relative">
                        <h4 className="px-2 text-2xl font-bold text-navy-500 ">
                          {event.eventName}
                        </h4>
                      </div>
                      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 px-2 w-full relative">
                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="text-m font-bold text-gray-600">
                            Event Venue
                          </p>
                          <p className="text-base font-medium text-navy-700   ">
                            {event.bookedHallName}
                          </p>
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="text-m font-bold text-gray-600">
                            Location
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {event.bookedHall.location}
                          </p>
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="ext-m font-bold text-gray-600">
                            Cultural Name
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {event.organizingClub}
                          </p>
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="ext-m font-bold text-gray-600">
                            Event Date Type
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {event.eventDateType === "multiple"
                              ? "Multiple Days"
                              : event.eventDateType === "half"
                              ? "Half Day"
                              : "Full Day"}
                          </p>
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">

  <p style={{
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#666'
  }}>Time Remaining</p>
  <p style={{
    fontSize: '1.2rem',
    fontWeight: 'bold',
    animation: 'colorChange 1s infinite alternate', /* Add animation */
    /* You can set initial color here, for example */
    color: event.color || '#333', /* If event.color is not defined, fallback to #333 */
  }}>
    {event.countdown}
  </p>
</div>


                        {(event.eventDateType === "full" ||
                          event.eventDateType === "half") && (
                          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <p className="ext-m font-bold text-gray-600">
                              Event Date
                            </p>
                            <p className="text-base font-medium text-navy-700 ">
                              {format(
                                new Date(event.eventDate),
                                "EEEE dd-MM-yyyy"
                              )}
                            </p> 
  

                          </div>

                          

                        )}

                        {event.eventDateType === "half" && (
                          <>
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                              <p className="ext-m font-bold text-gray-600">
                                Starts At
                              </p>
                              <p className="text-base font-medium text-navy-700 ">
                                {format(
                                  parseISO(event.startTime.slice(0, -1)),
                                  "hh:mm aa"
                                )}
                              </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                              <p className="ext-m font-bold text-gray-600">
                                Ends At
                              </p>
                              <p className="text-base font-medium text-navy-700 ">
                                {format(
                                  parseISO(event.endTime.slice(0, -1)),
                                  "hh:mm aa"
                                )}
                              </p>
                            </div>
                          </>
                        )}

                        {event.eventDateType === "multiple" && (
                          <>
                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                              <p className="ext-m font-bold text-gray-600">
                                Event Start Date
                              </p>
                              <p className="text-base font-medium text-navy-700 ">
                                {format(
                                  new Date(event.eventStartDate),
                                  "EEEE dd-MM-yyyy"
                                )}
                              </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                              <p className="ext-m font-bold text-gray-600">
                                Event End Date
                              </p>
                              <p className="text-base font-medium text-navy-700 ">
                                {format(
                                  new Date(event.eventEndDate),
                                  "EEEE dd-MM-yyyy"
                                )}
                              </p>

                            </div>
                          </>
                        )}

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="ext-m font-bold text-gray-600">
                            Event Coordinator
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {event.eventManager}
                          </p>
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="ext-m font-bold text-gray-600">
                            Club Name
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {event.department} - {ClubList[event.department]}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="ext-m font-bold text-gray-600">Phone</p>
                          <p className="text-base font-medium text-navy-700 ">
                            {event.phoneNumber}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="ext-m font-bold text-gray-600">
                            Registration Amount
                          </p>
                          <p className="text-base font-medium text-navy-700">
                            {event.regamt}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="ext-m font-bold text-gray-600">
                          Event Rule
                        </p>
                        <Popup event={event}/>
                        </div>
                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <button
                          style={{ backgroundColor: '#6d7f69',width:"200px",alignItems:"center" }}
                          onClick={() => handleViewClick(event._id)}
                          class="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-gray-900 focus:bg-gray-900 focus:outline-none">
                          Book Event
                        </button>
                        </div>

                      </div>
                    
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  ):(
                  <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">
                    No Upcomming Events.
                  </h2>
                  )
                </>
              ) : (
                <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">
                  No Upcomming Events.
                </h2>
              )}
            </>
          ))
        ) : (
          <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">
            No Upcomming Events.
          </h2>
        )}
      </div>
    </>
  );
};

export default Events;
