import React, { useState, useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function CertificateGeneration({ eventData }) {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    // Extract words from the note
    const words = note.split(" ");
    if (words.length >= 3) {
      // Assuming the first word is the date, the second word is the month, and the third word is the event name
      const date = words[0];
      const month = words[1];
      const eventName = words.slice(2).join(" ");
      // Validate the date, month, and event name against eventData
      if (
        eventData.createdAt.includes(date) &&
        eventData.createdAt.includes(month) &&
        eventData.eventName.includes(eventName)
      ) {
        // If all details match, save the note
        setSavedNotes([...savedNotes, note]);
        setNote("");
      } else {
        // Display an error or prompt for invalid details
        alert("Invalid note details. Please check and try again.");
      }
    } else {
      // Display an error if the note doesn't contain enough words
      alert("Note must contain date, month, and event name.");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Voice Notes</h1>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          className="box"
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "45%",
          }}
        >
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button
            onClick={handleSaveNote}
            disabled={!note}
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Save Note
          </button>
          <button
            onClick={() => setIsListening((prevState) => !prevState)}
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Start/Stop
          </button>
          <p style={{ fontSize: "18px" }}>{note}</p>
        </div>
        <div
          className="box"
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "45%",
          }}
        >
          <h2>Notes</h2>
          {savedNotes.map((n, index) => (
            <p key={index} style={{ fontSize: "18px", marginBottom: "10px" }}>
              {n}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default CertificateGeneration;
