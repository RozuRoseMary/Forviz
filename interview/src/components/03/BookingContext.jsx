import React, { useContext, useState } from "react";
import { createContext } from "react";
const BookingContext = createContext();

export function BookingContextProvider({ children }) {
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [schedule, setSchedule] = useState([]);

  return (
    <BookingContext.Provider
      value={{ setTodaySchedule, todaySchedule, schedule, setSchedule }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  return ctx;
};
