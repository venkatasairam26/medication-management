import React from 'react';
import { FaClock } from 'react-icons/fa';
import './styles.css';

const TodaysStatus = () => {
    const medications = [
        { id: 1, name: 'Daily Medication Set', time: '8:00 AM', status: 'pending' },
        // Add more medication items as needed
    ];

    return (
        <div className="card todays-status">
            <h2 className="card-title">Today's Status</h2>
            {medications.map(med => (
                <div key={med.id} className="medication-item">
                    <div className="medication-info">
                        <h3>{med.name}</h3>
                        <div className="time">
                            <FaClock className="icon" />
                            <span>{med.time}</span>
                        </div>
                    </div>
                    <span className={`status-badge ${med.status}`}>
                        {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TodaysStatus;
