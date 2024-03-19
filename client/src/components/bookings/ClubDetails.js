import React, { useState,useEffect } from "react";
import axios from "axios";
import { institutions } from "../Institutions";

const AllClubs = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [culturalLists,setCulturalLists] = useState([]);

  const getEventData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/events`, {
        // withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = response.data.bookings;
      console.log("data",data);

      const culturalList = data.map(event => event.organizingClub);
      console.log("cultural list",culturalList);

      setCulturalLists(culturalList);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getEventData();
  }, []);

  const styles = {
    rainbowText: {
      animation: 'rainbow-text 5s infinite',
    },
    clubCard: {
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      width: '100%', 
      maxWidth: '300px', 
    },
  };

  const navigateToEventPage = (CulturalName) => {
    window.location.href = `/events?CulturalName=${CulturalName}`;
  };

  const css = `
    /* Rainbow text animation */
    @keyframes rainbow-text {
      0% {
        color: #ff0000;
      }
      16% {
        color: #ff7f00;
      }
      32% {
        color: #ffff00;
      }
      48% {
        color: #00ff00;
      }
      64% {
        color: #0000ff;
      }
      80% {
        color: #4b0082;
      }
      100% {
        color: #9400d3;
      }
    }

    /* Grow animation */
    @keyframes grow {
      0% {
        transform: scale(0);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      }
    }

    /* Container background animation */
    @keyframes container-bg {
      0% {
        background-color: #ffffff;
      }
      50% {
        background-color: #f3f3f3;
      }
      100% {
        background-color: #ffffff;
      }
    }

    /* Apply animation to text and card */
    .rainbow-text {
      animation: rainbow-text 5s infinite;
    }

    .clubCard {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      animation: grow 0.5s ease;
    }

    /* Additional styles for a vibrant look */
    .container {
      animation: container-bg 10s infinite;
    }
  `;

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{css}</style> 
      <h1 className="text-3xl font-bold mb-4" style={{"textAlign":"center"}}>All Cultural</h1>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
        {institutions.slice(0, 15).map((institution, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4" style={{"width":"1500px"}}>
            <h2 className="text-xl font-semibold mb-2" style={{"textAlign":"center"}}>{institution.name} Cultural</h2>
            <div className="grid grid-cols-4 gap-2">
              {culturalLists.map((Cultural, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-md" style={styles.clubCard}>
                   <a href="#" onClick={() => navigateToEventPage(Cultural)} className="text-lg font-semibold mb-2" style={styles.rainbowText}>
                    {Cultural}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClubs;
