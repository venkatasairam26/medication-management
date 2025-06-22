import './index.css';
import { FaClock } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
const Medication = () => {
    return (
        <div>
            <h1 className="today-medication-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-6 h-6 text-blue-600"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> Today's Medication</h1>
            <div className='medication-set-container'>
                <div className='medication-set'>
                    <div className='medication-set-num-name'>
                        <div className="medication-number">
                            <p>1</p>
                        </div>
                        <div className='medication-set-name'>
                            <h1>Daily Medication Set</h1>
                            <p>Complete set of daily tablets</p>
                        </div>
                    </div>
                    <div className='medication-set-time'>
                        <h1> <FaClock className='icon' /> 8:00 AM</h1>
                    </div>
                </div>
            </div>
            <div className='upload-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image w-12 h-12 text-muted-foreground mx-auto mb-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
               <h4>Add Proof Photo (Optional)</h4>
               <p>Take a photo of your medication or pill organizer as confirmation</p>
                <div className='upload-input'>
                <FaCamera className='icon' />
                <input type="file" placeholder="Take a photo" />
                </div>
            </div>
            <div className='mark-button-container'>
            <button className='mark-button'>Mark as Taken</button>
            </div>
        </div>
    );
};
export default Medication;