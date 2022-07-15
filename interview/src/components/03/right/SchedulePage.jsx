import React from "react";
import { Outlet } from "react-router-dom";
import HeaderDate from "./HeaderDate";

function SchedulePage() {
  return (
    <div className="schedule-container">
      <HeaderDate />
      <Outlet />
    </div>
  );
}

export default SchedulePage;
