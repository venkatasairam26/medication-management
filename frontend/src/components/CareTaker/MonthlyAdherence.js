import React from 'react';
import './styles.css';
const MonthlyAdherence = () => {
    const takenPercentage = 92;
    const missedDays = 4;
    const remainingDays = 3;
    const totalDays = 30;
    const takenDays = Math.round((takenPercentage / 100) * totalDays);
    const missedPercentage = (missedDays / totalDays) * 100;
    const remainingPercentage = (remainingDays / totalDays) * 100;
    return (
        <div className="card monthly-adherence">
            <div className="card-header">
                <h3>Monthly Adherence</h3>
            </div>
            <div className="adherence-metrics">
                <div className="adherence-metric">
                    <div className="metric-value">{takenPercentage}%</div>
                    <div className="metric-label">Taken</div>
                </div>
                <div className="adherence-metric">
                    <div className="metric-value">{missedDays}</div>
                    <div className="metric-label">Missed</div>
                </div>
                <div className="adherence-metric">
                    <div className="metric-value">{remainingDays}</div>
                    <div className="metric-label">Remaining</div>
                </div>
            </div>
            <div className="adherence-bar">
                <div 
                    className="bar-segment taken" 
                    style={{ width: `${takenPercentage}%` }}
                    title={`${takenDays} days taken`}
                ></div>
                <div 
                    className="bar-segment missed" 
                    style={{ width: `${missedPercentage}%` }}
                    title={`${missedDays} days missed`}
                ></div>
                <div 
                    className="bar-segment remaining" 
                    style={{ width: `${remainingPercentage}%` }}
                    title={`${remainingDays} days remaining`}
                ></div>
            </div>
            <div className="adherence-legend">
                <div className="legend-item">
                    <span className="legend-dot taken"></span>
                    <span>Taken</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot missed"></span>
                    <span>Missed</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot remaining"></span>
                    <span>Remaining</span>
                </div>
            </div>
        </div>
    );
};
export default MonthlyAdherence;
