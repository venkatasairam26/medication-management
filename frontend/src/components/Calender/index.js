import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './index.css';
const MedicationCalendar = () => {
  const [checkedDates, setCheckedDates] = useState([]);
  const fetchCheckedDates = () => {
    fetch("http://localhost:3000/dates")
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"res data");
        const backendDates = data.map(item => item.fullDate);
        setCheckedDates(prev => [...new Set([...prev, ...backendDates])]);  
      })
      .catch((err) => console.error("Error fetching checked dates:", err));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCheckedDates();
    }, 1000);
    return () => clearTimeout(timer); 
  }, []);
  const tileContent = ({ date }) => {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0); 
    const formatted = date.toLocaleDateString("en-CA");
    const isChecked = checkedDates.includes(formatted);
    const isToday = dateToCheck.getTime() === today.getTime();
    const isPast = dateToCheck < today;
    if (isChecked) return <div className="checked-dot"></div>;
    if (isPast) return <div className="missed-dot"></div>;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const isEndOfToday = currentHour === 23 && currentMinute >= 59;
    if (isToday && isEndOfToday) return <div className="missed-dot"></div>;
    return null;
  };
  return (
    <div className="calendar-container">
      <Calendar
        tileContent={tileContent}
        tileClassName={({ date }) => {
          const formatted = date.toLocaleDateString("en-CA");
          return checkedDates.includes(formatted) ? "checked-date" : "";
        }}
      />
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot taken"></span>
          <span>Medication taken</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot missed"></span>
          <span>Missed medication</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot today"></span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};
export default MedicationCalendar;