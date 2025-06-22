import React from 'react';
import './styles.css';

const NavTabs = (props) => {
    const { activeTab, handleTabChange } = props;
    console.log(activeTab);
    

    const handleTabClick = (tab) => {
        handleTabChange(tab);  
    };

    return (
        <nav className="dashboard-nav">
            <ul className="nav-tabs">
                <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabClick('overview')}>
                    Overview
                </li>
                <li className={activeTab === 'recent' ? 'active' : ''} onClick={() => handleTabClick('recent')}>
                    Recent Activity
                </li>
                <li className={activeTab === 'calendar' ? 'active' : ''} onClick={() => handleTabClick('calendar')}>
                    Calendar View
                </li>
                <li className={activeTab === 'notifications' ? 'active' : ''} onClick={() => handleTabClick('notifications')}>
                    Notifications
                </li>
            </ul>
        </nav>
    );
};

export default NavTabs;
