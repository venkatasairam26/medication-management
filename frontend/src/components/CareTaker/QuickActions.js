import React from 'react';
import { FaEnvelope, FaBell, FaCalendarAlt } from 'react-icons/fa';
import './styles.css';
const QuickActions = () => {
    const actions = [
        { 
            id: 1, 
            icon: <FaEnvelope className="action-icon" />, 
            text: 'Send Reminder Email',
            onClick: () => console.log('Send reminder email')
        },
        { 
            id: 2, 
            icon: <FaBell className="action-icon" />, 
            text: 'Configure Notifications',
            onClick: () => console.log('Configure notifications')
        },
        { 
            id: 3, 
            icon: <FaCalendarAlt className="action-icon" />, 
            text: 'View Full Calendar',
            onClick: () => console.log('View full calendar')
        }
    ];
    return (
        <div className="card quick-actions">
            <h2 className="card-title">Quick Actions</h2>
            <ul className="action-list">
                {actions.map(action => (
                    <li key={action.id} className="action-item" onClick={action.onClick}>
                        {action.icon}
                        <span>{action.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default QuickActions;
