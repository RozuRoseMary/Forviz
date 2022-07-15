import React from "react";
import { Outlet } from "react-router-dom";
import RoomLeft from "./left/RoomLeft";
import SchedulePage from "./right/SchedulePage";

function BookingPage() {
  return (
    <div className="bg">
      <div className="booking-container">
        {/* LEFT */}
        <RoomLeft />

        {/* RIGHT */}
        <SchedulePage />
      </div>
    </div>
  );
}

export default BookingPage;
