import {Button, Grid} from '@mui/material';
import React, {useState,createContext} from 'react'
import CitySearch from './city-search/CitySearch';
import ServiceCard from './ServiceCard'
import './services.style.css';

export const cityContext = createContext("");

const serCon = [
    {
        title : "Get your Guides or Tours",
    },
    {
        title : "Find Home Stays",
    },
    {
        title : "Online Parking Booking",
    },
    {
        title : "Get vehicles on rent",
    }
]

const Services = () => {

    const [city,setCity] = useState(null);
    const [showServices,setShowServices] = useState(0);

    return (
        <cityContext.Provider  value={{value1 : [city,setCity], value2 : [showServices,setShowServices]}}>
        {showServices===0 ? 
            <div className='main-page'>
                <CitySearch /> 
            </div>
            : 
            <Grid container direction='column' spacing={2} style={{minHeight:'90vh',paddingTop:'1vh'}}>
                <Grid item container spacing={5} justifyContent='center'>
                    <Grid item><h1>You searched for : {city}</h1></Grid>
                    <Grid item><Button size="medium" variant="contained" onClick={() => {setShowServices(0); setCity(null);}}> Change City <i className="fa fa-chevron-circle-left"></i> </Button></Grid>
                </Grid>
                <Grid item container direction='column' spacing={2} style={{paddingLeft:'1.5vw',paddingRight:'1.5vw'}}>
                    <Grid item>
                        <h2>Our Services</h2>
                    </Grid>
                    <Grid item container direction='column' spacing={2}>
                        <Grid item><ServiceCard title={serCon[0].title} description={serCon[0].desc} linkTo = {`/services/guides/${city}`} city={city} /></Grid>
                        <Grid item><ServiceCard title={serCon[1].title} description={serCon[1].desc} linkTo = {`/services/home_stay/${city}`} city={city} /></Grid>
                        <Grid item><ServiceCard title={serCon[2].title} description={serCon[2].desc} linkTo = {`/services/parking/${city}`} city={city} /></Grid>
                        <Grid item><ServiceCard title={serCon[3].title} description={serCon[3].desc} linkTo = {`/services/rent/${city}`} city={city} /></Grid>
                    </Grid>
                </Grid>
            </Grid>
        }
        </cityContext.Provider>
)}

export default Services;
