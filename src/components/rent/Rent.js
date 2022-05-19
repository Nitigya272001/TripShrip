import React, {useState,useEffect} from 'react'
import ProfileCard from '../profile-card/ProfileCard';
import axios from 'axios';
import {useParams} from 'react-router';

function Rent() {
    const [fromDate,setFromDate] = useState(null);
    const [untilDate,setUntilDate] = useState(null);
    const [results,setResults] = useState(null);
    const [bg,setbg] = useState(null);
    const {city} = useParams();
    const[todayDate,setTodayDate] = useState(new Date());

    useEffect(() => {
        setbg(`https://source.unsplash.com/1200x900/?travel-tour-trip`);
        setTodayDate(new Date());
    }, [])

    const filterResults = () => {
        let vehicleWaleResponse = [{

        },{
            
        },{

        },{

        }];

        setResults(vehicleWaleResponse.map((vehicleWala) => {
            return <ProfileCard name={vehicleWala.name} days={vehicleWala.days} duration={vehicleWala.duration} language={vehicleWala.language} rating={vehicleWala.rating} ratingsCount={vehicleWala.ratingsCount} />
        }))
    }

    return (
        <div>
            <div style={{height: "60vh", width:'100vw', backgroundImage : `url(${bg})`, backgroundSize: '100%', backgroundPosition : 'center center',  display : 'flex' , alignItems : 'center'}}>
                <div style={{width:'30vw', height : '30vh', backgroundColor : 'white' ,borderRadius : '12px' , border : '2px solid black', marginLeft : '15vw', display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
                    <h3> Get vehicles on rent in {city} </h3>
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
                     <label> Till Date </label>
                    <input 
                        style={{width : "90%"}} 
                        name='untilD' 
                        type="date" 
                        class="datepicker" 
                        value={untilDate} 
                        onChange={(e) => {setUntilDate(e.target.value);}}
                        min={`${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`}
                    />
                    <button class="btn waves-effect waves-light" style={{width : "60%"}} type='submit' onClick={filterResults}> Search </button>
                </div>
            </div>
            {results}
        </div>
    )
}

export default Rent;