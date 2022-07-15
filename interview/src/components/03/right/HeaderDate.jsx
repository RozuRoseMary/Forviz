import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function HeaderDate() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const [params, setParams] = useSearchParams();

  // setParams({ roomId: "A101" });
  // console.log(params.get("roomId"));

  const headerData = [
    {
      title: "THIS WEEK",
      to: "/bookings/thisweek/A101",
    },
    {
      title: "NEXT WEEK",
      to: "/bookings/nextweek/A101",
    },
    {
      title: "WHOLE MONTH",
      to: "/bookings/wholemouth/A101",
    },
  ];
  return (
    <div className="header-date">
      <ul className="text-24">
        {headerData.map((el, idx) => (
          <div
            className="cursor-pointer"
            key={idx}
            onClick={() => navigate(el.to)}
          >
            {/* <Link to={el.to}> */}
            <li
              className={`text-24 text-hover  ${
                pathname === el.to ? "active" : "opacity-50"
              }`}
            >
              {el.title}
            </li>
            {/* </Link> */}
            {pathname === el.to && <div className="active-line"></div>}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default HeaderDate;
