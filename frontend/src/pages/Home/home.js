import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './home.css';
import { useState } from 'react';
import PatientComp from '../../components/Patient/PatientComp';
import ChooseBoarding from '../ChooseBoarding';
import CaretakerDashboard from '../../components/CareTaker';
const Home = () => {
    const jwtToken = Cookies.get('jwtToken');
    const history = useHistory();
    const [boardingAction, setBoardingAction] = useState(true);
    const [showOnboardingComponent, setShowOnboardingComponent] = useState('');
    const shownOnboardingComponent = (boarding) => {
        
        setShowOnboardingComponent(boarding);
    }


    const onChangeBoardingAction = () => {
        setBoardingAction(!boardingAction);
    }

    if (!jwtToken) {
        history.replace('/login');
    }

    const PatientIcon = () => {
        return (
            <>
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

            </>
        );
    };


    const CareTakerIcon = () => {
        return (
            <>
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

            </>
        );
    };

    const onBoardingComponent = () => {
        return (
            <>
                <div className="nav-bg-color">
                    <div className="nav-container">
                        <div className="logo-part-container">
                            <div className="logo-container">M</div>
                            <div className="logo-text-container">
                                <h1 className="logo-text">MediCare Companion</h1>
                                <p className="logo-sub-text">
                                    {showOnboardingComponent === 'patient' ? "Patient View" : "Caretaker View"}
                                </p>
                            </div>
                        </div>
                        <div
                            className="patient-care-taker-button"
                            onClick={() => setShowOnboardingComponent(showOnboardingComponent === 'patient' ? 'caretaker' : 'patient')}
                        >
                            <div className="icon-cont text-sm">
                                {showOnboardingComponent === 'patient' ? CareTakerIcon() : PatientIcon()}
                            </div>
                            <h1 className="text-sm">
                                {showOnboardingComponent === 'patient' ? "Switch to Caretaker" : "Switch to Patient"}
                            </h1>
                        </div>
                    </div>
                </div>
                {(() => {
                    switch(showOnboardingComponent) {
                        case 'patient':
                            return <PatientComp />;
                        case 'caretaker':
                            return <CaretakerDashboard />;
                        default:
                            return null;
                    }
                })()}
            </>
        )
    }

    return (
        <div className="container">
            {boardingAction ? <ChooseBoarding onChangeBoardingAction={onChangeBoardingAction} shownOnboardingComponent={shownOnboardingComponent} /> : onBoardingComponent()}
        </div>
    );
}
export default Home;
