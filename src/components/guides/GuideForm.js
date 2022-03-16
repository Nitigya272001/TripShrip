import React, { useState } from "react"
import "./GuideForm.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {db} from '../../Firebase/Fire';
import {addDoc, collection} from 'firebase/firestore';

const Register = () => {

    const navigate = useNavigate()

    const [ user, setUser] = useState({
        profile:"",
        name: "",
        city: "",
        email:"",
        mobile:"",
        language: [],
        days: [],
        license:0,
        description:"",
        startHour:"",
        endHour:"",
    });

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handlePhoto = (e) => {
        setUser({...user, profile: e.target.files[0]});
    }

    const register = (e) => {
        e.preventDefault();

        let {profile,name,city,email,mobile,language,days,description,startHour,endHour,license} = user;

        language = language.split(" ");
        days = days.split(" ");

        const imageData = new FormData();
        imageData.append('file', profile);
        imageData.append('upload_preset', 'minorproject');
        imageData.append('cloud_name', 'diuazm4pi');

        fetch('https://api.cloudinary.com/v1_1/diuazm4pi/image/upload', {
            method:"post",
            body:imageData
        })
        .then( resp => resp.json()) 
        .then( async (data) => {
            const collectionName = city + '-guides';
            try {
                await addDoc(collection(db, collectionName), {
                    profile:data.url,
                    name:name,
                    city:city,
                    email:email,
                    mobile:mobile,
                    language:language,
                    days:days,
                    description:description,
                    startHour:startHour,
                    endHour:endHour,
                    license:license
                });
                alert("Thank for joining us!");
                navigate("/");
              } catch (e) {
                alert("Error: ", e);
              }
        })
        .catch(err => alert(err));
    }

    return (
    <div className="flexbox">
        <form className="register" onSubmit={register} encType='multipart/form-data'>
            <h1>Register yourself as a guide</h1>
            <label style={{display:'inline'}}> Select your profile picture </label>
            <input type="file" id="profile" name="profile" accept="image/png, image/gif, image/jpeg" onChange={handlePhoto} required />
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange } required ></input>
            <input type="text" name="city" value={user.city} placeholder="Your City" onChange={ handleChange } required ></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange } required ></input>
            <input type="text" name="mobile" value={user.mobile} placeholder="Your Mobile" onChange={ handleChange } required ></input>
            <input type="text" name="days" value={user.days} placeholder="Days Available(Space sperated)" onChange={ handleChange } required ></input>
            <input type="text" name="language" value={user.language} placeholder="Your Preferred Languages(Space Seperated)" onChange={ handleChange } required ></input>
            <textarea name="description" wrap="hard" rows={7} cols={70} placeholder="Tell us about the tour you will provide, what are the main attractions of focus, etc." value={user.description} onChange={ handleChange } />
            
            <label htmlFor="startHour">Select a Start time of day:</label>
            <input type="time" name="startHour" value={user.startHour} onChange={ handleChange } />
            
            <label htmlFor="endHour">Select a End time of day:</label>
            <input type="time" name="endHour" value={user.endHour} onChange={ handleChange } />
            
            <input type="checkbox" name="license" value={!user.license} onChange={ handleChange } ></input>
            <label htmlFor="license"> Do you have a tour guide license ?</label>
            <input type="submit" className="button" />
        </form>
    </div>
    )
}

export default Register