import React, { useState } from "react"
import "./GuideForm.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {db} from '../../Firebase/Fire';
import {addDoc, collection} from 'firebase/firestore';

const Register = () => {

    const navigate = useNavigate()

    const [ days, setDays] = useState({
        Monday : false,
        Tuesday : false,
        Wednesday : false,
        Thrusday : false,
        Friday : false,
        Saturday : false,
        Sunday : false
    })

    const [ user, setUser] = useState({
        profile:"",
        name: "",
        city: "",
        email:"",
        mobile:"",
        language: [],
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

    const handleCheckboxChange = (e) => {
        setDays({...days, [e.target.name] : (e.target.value === 'true')});
        console.log(days);
    }

    const register = (e) => {
        e.preventDefault();

        let {profile,name,city,email,mobile,language,description,startHour,endHour,license} = user;

        language = language.split(" ");

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
            const collectionName = city.toLowerCase() + '-guides';
            try {
                let daysarr = [];
                Object.entries(days).forEach(([key, value]) => {
                    if(value===true) daysarr.push(key);
                });
                 
                await addDoc(collection(db, collectionName), {
                    profile:data.url,
                    name:name,
                    city:city,
                    email:email,
                    mobile:mobile,
                    language:language,
                    days:daysarr,
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
            <label> Days Available : </label>
            <br></br>
            <label style={{display:'inline'}}>Monday:</label><input type ="checkbox" onChange={handleCheckboxChange}  className="days" name="Monday" value={!days.Monday}></input>
            <label style={{display:'inline'}}>Tuesday:</label><input type ="checkbox" onChange={handleCheckboxChange} className="days" name="Tuesday" value={!days.Tuesday}></input>
            <label style={{display:'inline'}}>Wednesday:</label><input type ="checkbox" onChange={handleCheckboxChange} className="days" name="Wednesday" value={!days.Wednesday}></input>
            <label style={{display:'inline'}}>Thursday:</label><input type ="checkbox" onChange={handleCheckboxChange} className="days" name="Thursday" value={!days.Thrusday}></input>
            <br></br>
            <label style={{display:'inline'}}>Friday:</label><input type ="checkbox" onChange={handleCheckboxChange} className="days" name="Friday" value={!days.Friday}></input>
            <label style={{display:'inline'}}>Saturday:</label><input type ="checkbox" onChange={handleCheckboxChange} className="days" name="Saturday" value={!days.Saturday}></input>
            <label style={{display:'inline'}}>Sunday:</label><input type ="checkbox" onChange={handleCheckboxChange} className="days" name="Sunday" value={!days.Sunday}></input>
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