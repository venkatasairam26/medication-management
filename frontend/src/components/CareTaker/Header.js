import React from 'react';
import MetricCard from './MetricCard';
import './styles.css';

const Header = ({ patientName }) => {
    const metrics = [
        { value: '92%', label: 'Adherence Rate' },
        { value: '6', label: 'Current Streak' },
        { value: '4', label: 'Missed This Month' },
        { value: '3', label: 'Taken This Week' }
    ];

    return (
        <header className="dashboard-header">
            <div className="header-content">
                <h1>Caretaker Dashboard</h1>
                <p>Monitoring {patientName}'s medication adherence</p>
                
                <div className="metrics-container">
                    {metrics.map((metric, index) => (
                        <MetricCard 
                            key={index}
                            value={metric.value} 
                            label={metric.label} 
                        />
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
