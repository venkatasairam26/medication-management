import './styles.css';
import MedicationCalendar from '../Calender';

const CalendarView = () => {
    return (
        <div className="calendar-view">
            <MedicationCalendar />
            <div>
                <h4 className="details-heading">Details for June 22, 2025</h4>
                <div className="details-container">
                    <div className="details-card">
                        <div className="details-header">
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
                                className="icon"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span className="details-title">Today</span>
                        </div>
                        <p className="details-description">
                            Monitor Eleanor Thompson's medication status for today.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;