import React from 'react';
import './styles.css';
const MetricCard = ({ value, label }) => {
    return (
        <div className="metric-card">
            <div className="metric-value">{value}</div>
            <div className="metric-label">{label}</div>
        </div>
    );
};
export default MetricCard;
