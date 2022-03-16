import React, {useState,useEffect} from 'react'
import ProfileCard from '../profile-card/ProfileCard';
import {useParams} from 'react-router';
import Button from '@mui/material/Button';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../Firebase/Fire';

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
        let collectionName = city + "-guides";
        let guidesSnapshot = await getDocs(collection(db, collectionName));
        let guidesList =  guidesSnapshot.docs.map(doc => doc.data());

        setResults(guidesList.map((guide) => {
            return <ProfileCard profile={guide.profile} name={guide.name} days={guide.days} language={guide.language} rating={guide.rating} />
        }))
    }

    return (
        <div>
            <div style={{height: "60vh", width:'100vw', backgroundImage : "", backgroundSize: '100%', backgroundPosition : 'center center',  display : 'flex' , alignItems : 'center'}}>
                <div style={{width:'30vw', height : '30vh', backgroundColor : 'white' ,borderRadius : '12px' , border : '2px solid black', marginLeft : '15vw', display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
                    <h3> Get your guides in {city} </h3>
                    <input 
                        style={{width : "90%"}} 
                        name='fromD' 
                        type="date" 
                        class="datepicker" 
                        value={fromDate} 
                        onChange={(e) => {setFromDate(e.target.value);}} 
                        min={`${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`}
                    /> 
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
