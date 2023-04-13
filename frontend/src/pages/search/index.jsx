import React from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const search = new URLSearchParams(useLocation().search).get("search");
  console.log(search);
  return <></>;
}
