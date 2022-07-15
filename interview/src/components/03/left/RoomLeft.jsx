import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  currentDay,
  getBookingsForWeek,
  getDate,
  getDay,
  getMonth,
  getTime,
} from "../../02/bookingServices";
import { useBooking } from "../BookingContext";

function RoomLeft() {
  const { roomId } = useParams();

  const { todaySchedule, setTodaySchedule } = useBooking();

  useEffect(() => {
    try {
      setTodaySchedule(getBookingsForWeek(roomId, 0));
    } catch (err) {
      console.log(err);
    }
  }, [roomId]);

  return (
    <div className="left-booking">
      <div className="room-id-container">
        <p className="room-id text-54 font-700">{roomId}</p>
      </div>

      <div className="upcoming-container">
        <p className="text-18 font-700">Upcoming</p>

        <div className="">
          <p className="text-64 opacity-50 font-300">{getDay(currentDay)}</p>
          <p className="text-64">
            {getDate(currentDay)} {getMonth(currentDay)}
          </p>
        </div>

        <div className="today-schedule-container">
          <div className="left-schedule ">
            {todaySchedule?.map((booking, idx) => (
              <div className="left-today-schedule" key={idx}>
                <p className="text-16 opacity-50 font-400">
                  {getTime(booking.startTime, booking.endTime)}
                </p>
                <p className="text-20 font-400">{booking.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomLeft;
