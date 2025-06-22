import React, { useState } from 'react';
import Header from './Header';
import NavTabs from './NavTabs';
import DashboardContent from './DashboardContent';
import RecentActivity from './RecentActivity/RecentActivity';
import CalendarView from './CalendarView';
import Notifications from './notification/Notifications';
import './styles.css';

const CareTakerDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const patientName = "Eleanor Thompson";
    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    
    const renderContentBasedOnTab = () => {
        switch (activeTab) {
            case 'overview':
                return <DashboardContent />;
            case 'recent':
                return <RecentActivity />;
            case 'calendar':
                return <CalendarView />;
            case 'notifications':
                return <Notifications />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="caretaker-dashboard">
            <Header patientName={patientName} />
            <NavTabs activeTab={activeTab} handleTabChange={handleTabChange} />
            <div className="dashboard-content">
                {renderContentBasedOnTab()}
            </div>
        </div>
    );
};

export default CareTakerDashboard;
