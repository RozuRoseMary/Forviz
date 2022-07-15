import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  currentDay,
  formatDateHeader,
  getBookingsForWeek,
  getTime,
  groupDate,
  test,
} from "../../02/bookingServices";
import { useBooking } from "../BookingContext";
import ScheduleByDate from "./ScheduleByDate";

function ScheduleDetailPage() {
  const { schedule, setSchedule } = useBooking();
  const { pathname } = useLocation();
  const week = pathname.split("/")[2];
  const { roomId } = useParams();

  let weekNo;
  const getWeekNo = () => {
    switch (week) {
      case "thisweek":
        weekNo = 1;
        break;
      case "nextweek":
        weekNo = 2;
        break;
      case "wholemouth":
        weekNo = 4;
        break;
      default:
        weekNo = 1;
        break;
    }
  };
  getWeekNo();

  useEffect(() => {
    setSchedule(getBookingsForWeek(roomId, weekNo));
  }, [week]);

  return (
    <div>
      <div className="right-schedule ">
        {groupDate(schedule).map((booking, idx) => (
          <div className="right-schedule-group-date" key={idx}>
            <p className="date-header font-700 text-18 color-gray">
              {formatDateHeader(booking.date, currentDay)}
            </p>
            <ScheduleByDate
              date={booking.date}
              scheduleInDate={booking.scheduleInDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleDetailPage;
