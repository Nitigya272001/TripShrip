import React from 'react'
import './ProfileCard.styles.css';
import { Rating } from '@mui/material';
import Button from '@mui/material/Button';


function ProfileCard(person) {
    return (
        <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-12 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src={person.profile} class="img-radius" alt="User-Profile" /> </div>
                                <Rating 
                                    name="read-only"
                                    value={person.rating} 
                                    precision={0.5} 
                                    size="large"
                                    sx={{
                                        color:"black",
                                    }}
                                    readOnly 
                                />
                                <p style={{color:"black"}}> {person.ratingsCount} Ratings</p>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">{person.name}</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Days</p>
                                        <h6 class="text-muted f-w-400">{person.days}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Hours</p>
                                        {/*<h6 class="text-muted f-w-400">{person.time[0]} - {person.time[1]}</h6>*/}
                                        <h6 class="text-muted f-w-400">14.00 - 18.00</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Duration</p>
                                        <h6 class="text-muted f-w-400">{person.duration}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Language</p>
                                        <h6 class="text-muted f-w-400">{person.language}</h6>
                                    </div>
                                </div>
                                <Button variant="contained"><a><i class="material-icons right">event_available</i>Booking and Details</a></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default ProfileCard;
