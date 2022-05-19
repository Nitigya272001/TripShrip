import React, {useState,useEffect} from 'react'
import ProfileCard from '../profile-card/ProfileCard';
import {useParams} from 'react-router';
import Button from '@mui/material/Button';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../Firebase/Fire';
import {fontSize} from '@mui/system';

function Guide() {
    const [fromDate,setFromDate] = useState(null);
    const [untilDate,setUntilDate] = useState(null);
    const [results,setResults] = useState(null);
    const {city} = useParams();
    const[todayDate,setTodayDate] = useState(new Date());

    useEffect(() => {
        setTodayDate(new Date());
    }, [])

    const filterResults = async () => {
        const d1 = new Date(fromDate);
        const d2 = new Date(untilDate);

        let diffDays = parseInt((d2-d1) / (1000 * 60 * 60 * 24), 10);

        let collectionName = city.toLowerCase() + "-guides";
        let guidesSnapshot = await getDocs(collection(db, collectionName));
        let guidesList =  guidesSnapshot.docs.map(doc => doc.data());

        if(diffDays < 7) {
            let daysRequired = [];
            var weekday=new Array(7);
            weekday[0]="Sunday";
            weekday[1]="Monday";
            weekday[2]="Tuesday";
            weekday[3]="Wednesday";
            weekday[4]="Thursday";
            weekday[5]="Friday";
            weekday[6]="Saturday";
            
            let loop = new Date(d1);
            while(loop <= d2)
            {
                daysRequired.push(weekday[loop.getDay()]);
                let newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }

            console.log(daysRequired)

            let newguidesList = [];
            guidesList.forEach(guide => {
                let ok = 0;
                daysRequired.forEach(day => {
                    if(guide.days.includes(day)) ok = 1; 
                });

                if(ok === 1) newguidesList.push(guide);
            })

            guidesList = newguidesList;
        }

        setResults(guidesList.map((guide) => {
            return <ProfileCard profile={guide.profile} name={guide.name} days={guide.days} language={guide.language} rating={guide.rating} />
        }))
    }

    return (
        <div>
            <div style={{height: "60vh", width:'100vw', backgroundImage : "", backgroundSize: '100%', backgroundPosition : 'center center',  display : 'flex' , alignItems : 'center'}}>
                <div style={{width:'30vw', height : '30vh', backgroundColor : 'white' ,borderRadius : '12px' , border : '2px solid black', marginLeft : '15vw', display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
                    <h3> Get your guides in {city} </h3>
                    <label> Start Date </label>
                    <input 
                        style={{width : "90%"}} 
                        name='fromD' 
                        type="date" 
                        class="datepicker" 
                        value={fromDate} 
                        onChange={(e) => {setFromDate(e.target.value);}} 
                        min={`${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`}
                    /> 
                    <label>Till Date </label>
                    <input 
                        style={{width : "90%"}} 
                        name='untilD' 
                        type="date" 
                        class="datepicker" 
                        value={untilDate} 
                        onChange={(e) => {setUntilDate(e.target.value);}}
                        min={`${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`}
                    />
                    <Button variant="contained" onClick={filterResults}>Search</Button>
                </div>
            </div>
            {results}
        </div>
    )
}

export default Guide;
