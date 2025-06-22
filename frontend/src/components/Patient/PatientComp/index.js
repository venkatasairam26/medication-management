import './index.css';
import Medication from '../Medication';
import Banner from '../Banner';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MedicationCalendar from '../../Calender/index';
const PatientComp = () => {
    const [medicationData, setMedicationData] = useState({});


    useEffect(() => {
        const getMedicationData = async () => {
            const jwtToken = Cookies.get('jwtToken');
            const url = 'http://localhost:3001/medication';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                }
            }
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                setMedicationData(data);
            } else {
                console.log(data.error);
            }
        }
        getMedicationData();
    }, [])

    // console.log(medicationData);
    return (
        <div>
            <Banner />
        <div className="dashboard-content">
                <div className="left-column">
                    <div className="card">
                        <Medication />
                    </div>
                </div>
                <div className="right-column">
                    <div className="card calendar-container">
                        <MedicationCalendar medicationData={medicationData}/>
                    </div>
                </div>
            </div>
        </div>  
    );
};
export default PatientComp;
