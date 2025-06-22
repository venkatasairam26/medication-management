import React, { useEffect, useState } from "react";
import "./index.css";

const RecentActivity = () => {
  const [data, setData] = useState([]);
  
  // Sample data for demonstration
  const dummData = [
    {
      day: "Monday",
      month: "June",
      date: "10",
      time: "8:30 AM",
      photo: false,
      status: "Completed"
    },
    {
      day: "Tuesday",
      month: "June",
      date: "11",
      time: "Medication missed",
      photo: false,
      status: "Missed"
    }
  ];

  // Combine API data with dummy data
  const updatedData = [...data, ...dummData];

  // Icons for the activity status
  const CompleteIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  const PendingIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  // Fetch data from API
  useEffect(() => {
    const fetchCheckedDates = async () => {
      try {
        const response = await fetch("http://localhost:3000/dates");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching checked dates:", error);
      }
    };

    fetchCheckedDates();
  }, []);

  return (
    <div className="recent-activity-container">
      <h1 className="recent-activity-title">Recent Medication Activity</h1>
      <div className="recent-activity-list-container">
        {updatedData.map((item, index) => (
          <div key={index} className="activity-item">
            <div className="history-card">
              <div className="history-left">
                <div className={item.status === "Completed" ? "icon-circle" : "icon-circle bg-pending"}>
                  {item.status === "Completed" ? <CompleteIcon /> : <PendingIcon />}
                </div>
                <div className="activity-details">
                  <p className="date-text">{`${item.day} ${item.month} ${item.date}`}</p>
                  <p className="time-text">
                    {item.status === "Completed" ? `Taken At: ${item.time}` : item.time}
                  </p>
                </div>
              </div>
              <div className="history-right">
                {item.photo && (
                  <div className="badge">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="badge-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                      <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                    Photo
                  </div>
                )}
                <div className={`badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;