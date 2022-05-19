import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import HomeStayCard from './HomeStayCard';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../Firebase/Fire';
import { fontFamily } from '@mui/system';
import {Grid} from '@mui/material';

const HomeStay = () => {
    const [HomeStayCards,setHomeStayCards] = useState(null);
    const {city} = useParams();
  
    const ff = async() => {
      let collectionName = city.toLowerCase() + "-home-stays";
      let guidesSnapshot = await getDocs(collection(db, collectionName));
      let HomeStayContents = (guidesSnapshot.docs.map(doc => doc.data()));
  
      setHomeStayCards(HomeStayContents.map((HomeStayContent)=>{
        return <HomeStayCard title={HomeStayContent.title} linkTo={""} image={HomeStayContent.images} description={HomeStayContent.HomeStaytext}/>
      }))
    }
  
    useEffect(() => {
      ff();
    }, [])
  
    return (
      <>
        <h1> Home Stays in the {city} </h1>
        {HomeStayCards}
      </>
    )
}

export default HomeStay