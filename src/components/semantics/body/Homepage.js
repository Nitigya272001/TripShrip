import React, {useContext} from "react";
import FeatureCard from './FeatureCard';
import { Grid } from '@mui/material';
import './Homepage.css';
import AuthContext from "../../auth/AuthContext";

const CardsContent = [
    {
        title: "Travel Blogs",
        description : "See What others say about places from your bucket list or share your own experience",
        linkTo : "/travel_blogs"
    },
    {
        title: "Trip Planner, Group Planner",
        description : "Your groups to plan your trips, track location and much more",
        linkTo : "/trip_groups"
    },
    {
        title: "Different Services",
        description : "Get a guide or book a vehicle on rent for your trip destination",
        linkTo : "/services"
    },
    {
        title: "Register as Guide",
        description : "Want to be a guide?, You can create yourself a profile!",
        linkTo : "/guide_register"
    },
    {
        title: "Put your home for home stay",
        description : "Want to put your extra space/home/room for stay?, Put some images and contact.",
        linkTo : "/home_stay_add"
    },
    {
        title: "Put vehicles on rent",
        description : "Want to give your vehicles on rent?, Put some images and contact, that's it!",
        linkTo : "/rent_register"
    },
]

const Cards = CardsContent.map((CardContent) => {
    return (
        <Grid item xs={10} sm={4} >
            <FeatureCard title={CardContent.title} description={CardContent.description} linkTo={CardContent.linkTo} />
        </Grid>
    )
})

const Homepage = () => {
   return (
    <Grid container direction="column" spacing={2}>
        <Grid item container style={{minHeight:"94vh"}} className="app__header app__wrapper section__padding" id="home">
            <div className="app__wrapper_info">
                <h1 className="app__header-h1">All you need while triping</h1>
                <button type="button" className="custom__button" onClick={() => window.scrollTo(500, 700)}>Explore Different Features</button>
            </div>

            <div className="app__wrapper_img">
                <img src='https://cdn.vectorstock.com/i/1000x1000/65/04/time-to-travel-website-landing-page-design-vector-24056504.webp' alt="header_img" />
            </div>
        </Grid>    
        <Grid item container direction='column' spacing={1} alignItems='center' justifyContent="center"> 
            <Grid item container justifyContent="center" alignItems="center">
                <h2>Our Features</h2>
            </Grid>
            <Grid item container spacing={2} style={{paddingLeft:"5vw",minHeight:"60vh"}} justifyContent="center" alignItems="center">
                {Cards}
            </Grid>
        </Grid>
    </Grid>
   )
}

export default Homepage;