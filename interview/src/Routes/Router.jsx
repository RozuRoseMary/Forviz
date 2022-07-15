import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BookingPage from "../components/03/BookingPage";
import ScheduleDetailPage from "../components/03/right/ScheduleDetailPage";

function Router() {
  return (
    <Routes>
      {/* <Route path="*" element={<Navigate to="/bookings" />} /> */}
      <Route path="/bookings" element={<BookingPage />}>
        <Route
          path="*"
          element={<Navigate to="/bookings/thisweek/:roomId" />}
        />
        <Route path="thisweek/:roomId" element={<ScheduleDetailPage />}></Route>
        <Route path="nextweek/:roomId" element={<ScheduleDetailPage />}></Route>
        <Route
          path="wholemouth/:roomId"
          element={<ScheduleDetailPage />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default Router;
