import React from 'react';
import TodaysStatus from './TodaysStatus';
import QuickActions from './QuickActions';
import MonthlyAdherence from './MonthlyAdherence';
import './styles.css';

const DashboardContent = () => {
    return (
        <div className="dashboard-content">
            <div className="left-column">
                <TodaysStatus />
                <MonthlyAdherence />
            </div>
            <div className="right-column">
                <QuickActions />
            </div>
        </div>
    );
};

export default DashboardContent;
