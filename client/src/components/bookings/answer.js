import React from "react";
import { useLocation } from "react-router-dom";

const OtherPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const note = searchParams.get("note");

  return (
    <>
      <h1>Other Page</h1>
      <p>Note: {note}</p>
    </>
  );
};

export default OtherPage;
