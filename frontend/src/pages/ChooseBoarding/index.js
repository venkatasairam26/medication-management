import './index.css';
const ChooseBoarding = (props) => {
    const {onChangeBoardingAction, shownOnboardingComponent} = props;

    const setPatientAction = () => {
        onChangeBoardingAction(true);
        shownOnboardingComponent('patient');
    }
    const setCaretakerAction = () => {
        onChangeBoardingAction(true);
        shownOnboardingComponent('caretaker');  
    }
    return (
        <div className='boarding-container'>
            <div className='heart-icon'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.29l-1.16-1.16a5.5 5.5 0 0 0-7.78 7.78l1.16 1.16L12 21.71l7.78-7.78 1.16-1.16a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </div>
            <h1>Welcome to MediCare Companion</h1>
            <p>Your trusted partner in medication management. Choose your role to get started with personalized features.</p>
            <div className='boarding-button-container'>
                <div className='patient-cont'>
                    <div className='patient-icon'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <h4>I'm a Patient</h4>
                    <p >Track your medication schedule and maintain your health records</p>
                    <ul>
                        <li>Mark medications as taken</li>
                        <li>Upload proof photos (optional)</li>
                        <li>View your medication calendar</li>
                        <li>Large, easy-to-use interface</li>
                    </ul>
                    <button className="patient-button" onClick={setPatientAction}>patient</button>
                </div>
                <div className='caretaker-cont'>
                    <div className='caretaker-icon'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <h4>I'm a Caretaker</h4>
                    <p>Monitor and support your loved one's medication adherence</p>
                    <ul>
                        <li>Monitor medication compliance</li>
                        <li>Set up notification preferences</li>
                        <li>View detailed reports</li>
                        <li>Receive email alerts</li>
                    </ul>
                    <button className="caretaker-button" onClick={setCaretakerAction}>caretaker</button>
                </div>
            </div>
        </div>
    );
};
export default ChooseBoarding;
