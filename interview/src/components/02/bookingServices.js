const data = require("./scheduleData.json");

const changeTimeFormat = (time) => new Date(time);
const changeDateFormat = (date) => new Date(date).getTime(); //return : 1657456804691

export const checkAvailability = (roomId, startTime, endTime) => {
  const unAvailableRoom = data.filter((room) => {
    const startTime = changeTimeFormat(room.startTime);
    const endTime = changeDateFormat(room.endTime);

    return (
      room.roomId === roomId &&
      startTime <= changeTimeFormat(startTime) &&
      endTime >= changeTimeFormat(endTime)
    );
  });

  if (unAvailableRoom.length !== 0) {
    return "This room already reserved.";
  } else {
    return "This room is available.";
  }
};

//   Assume date from booking date
export const currentDay = "2019-09-28 00:00:00";

export const getBookingsForWeek = (roomId, weekNo) => {
  const currentDate = new Date(currentDay).getTime();
  const tomorrowDate = currentDate + 1 * 24 * 60 * 60 * 1000;

  const day = new Date(currentDay).getDate();
  const dayOfTheWeek = new Date(currentDay).getDay();
  //   Find the first day of this week
  const fistDayOfThisWeek = day - dayOfTheWeek + (dayOfTheWeek == 0 ? -6 : 1);
  //    Transform to time
  const firstDateOfThisWeek = new Date(
    new Date(currentDay).setDate(fistDayOfThisWeek)
  ).getTime();

  const firstDateOfNextWeek = firstDateOfThisWeek + 7 * 24 * 60 * 60 * 1000;
  const firstDateOfThirdWeek = firstDateOfThisWeek + 14 * 24 * 60 * 60 * 1000;

  const getDate = data.filter((booking) => {
    const startTime = changeDateFormat(booking.startTime);
    const endTime = changeDateFormat(booking.endTime);

    // If weekNo = 0 return [...arr] of 'today bookings'
    // If weekNo = 1 return [...arr] of 'this week bookings'
    // If weekNo = 2 return [...arr] of 'next week bookings'
    // If weekNo = 4 return [...arr] of 'whole month bookings'
    return (
      booking.roomId === roomId &&
      (weekNo === 0
        ? (startTime >= currentDate && startTime < tomorrowDate) ||
          (endTime >= currentDate && endTime < tomorrowDate)
        : weekNo === 1
        ? (startTime >= fistDayOfThisWeek && startTime < firstDateOfNextWeek) ||
          (endTime >= fistDayOfThisWeek && endTime < firstDateOfNextWeek)
        : weekNo === 2
        ? (startTime >= firstDateOfNextWeek &&
            startTime < firstDateOfThirdWeek) ||
          (endTime >= firstDateOfNextWeek && endTime < firstDateOfThirdWeek)
        : weekNo === 4
        ? (startTime >= currentDate && startTime < firstDateOfThirdWeek) ||
          (endTime >= currentDate && endTime < firstDateOfThirdWeek)
        : "")
    );
  });

  return getDate;
};

export const groupDate = (arr) => {
  // 1. assign date reserved as key obj
  // 2. check if startTime and endTime have range more than one, It will return date between that range

  //   put date as key obj
  const groupsDateObj = arr.reduce((group, booking) => {
    const startTime = booking.startTime.split(" ")[0];
    const endTime = booking.endTime.split(" ")[0];
    const diffDate = new Date(endTime) - new Date(startTime);

    if (diffDate <= 1) {
      if (!group[startTime]) {
        group[startTime] = [];
      }
      group[startTime].push(booking);
      return group;
    } else {
      // find date between startDate and endDate, if range between two date is more than 1,
      for (
        let dt = new Date(startTime);
        dt <= new Date(endTime);
        dt.setDate(dt.getDate() + 1)
      ) {
        const date = new Date(dt).toISOString().slice(0, 10);
        if (!group[date]) {
          group[date] = [];
        }
        group[date].push(booking);
      }
      return group;
    }
  }, {});

  //   add groups date to one array
  const groupDateAsArray = Object.keys(groupsDateObj).map((date) => {
    return { date, scheduleInDate: groupsDateObj[date] };
  });

  return groupDateAsArray;
};

export const getDay = (date) => {
  const dayOfTheWeek = new Date(date).getDay() + 1;

  switch (dayOfTheWeek) {
    case 1:
      return "Sunday";
      break;
    case 2:
      return "Monday";
      break;
    case 3:
      return "Tuesday";
      break;
    case 4:
      return "Wednesday";
      break;
    case 5:
      return "Thursday";
      break;
    case 6:
      return "Friday";
      break;
    case 7:
      return "Saturday";
      break;
    default:
      return "Day";
  }
};

export const getDate = (date) => new Date(date).getDate();

export const getMonth = (date) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getMonthNo = new Date(date).getMonth();

  return month[getMonthNo];
};

export const getTime = (startTime, endTime) => {
  const getStartTime = startTime.split(" ")[1].split(":").slice(0, 2).join(":");
  const getEndTime = endTime.split(" ")[1].split(":").slice(0, 2).join(":");

  return getStartTime + " - " + getEndTime;
};

export const formatDateHeader = (date, todayDate) => {
  const formatTodayDate = todayDate.split(" ")[0];
  const day = getDay(date).slice(0, 3);
  const dayNo = getDate(date);
  const month = getMonth(date);

  const oneDay = 24 * 60 * 60 * 1000;

  let displayDay = "";
  if (formatTodayDate === date) {
    displayDay = "Today";
  } else if (
    new Date(formatTodayDate).getTime() + oneDay ===
    new Date(date).getTime()
  ) {
    displayDay = "Tomorrow";
  }

  return `${displayDay} (${day}, ${dayNo} ${month})`;
};
