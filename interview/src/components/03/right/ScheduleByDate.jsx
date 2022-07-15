import React from "react";
import { getTime } from "../../02/bookingServices";

function ScheduleByDate({ scheduleInDate }) {
  return (
    <>
      {scheduleInDate.map((booking, idx) => (
        <div key={idx} className="right-date-schedule">
          <div className="time-wite-status">
            <div
              className={
                (idx + 1) / 2 === 1
                  ? "circle-status-green"
                  : (idx + 1) / 3 === 1
                  ? "circle-status-orange"
                  : "circle-status-blue "
              }
            ></div>
            <p className="time-in-the-day text-16 opacity-50 font-400">
              {getTime(booking.startTime, booking.endTime)}
            </p>
          </div>
          <p className="text-20 font-400 ">{booking.title}</p>
        </div>
      ))}
    </>
  );
}

export default ScheduleByDate;
