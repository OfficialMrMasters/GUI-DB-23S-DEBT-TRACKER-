import React from "react";
import { useLocation } from "react-router-dom";

function Borrow() {
  const { state } = useLocation();
  console.log(state);
  return <div></div>;
}

export default Borrow;
