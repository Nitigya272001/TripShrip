import React,{useState,useEffect, useContext} from "react";
import { Box } from '@mui/material';
import Fire from '../../../Firebase/Fire';
import {
    Routes,
    Route,
    useNavigate
  } from "react-router-dom";
import Loginform from '../../auth/LoginForm';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Guide from '../../guides/Guide'
import Parking from '../../parking/Parking';
import Rent from '../../rent/Rent';
import Services from '../../services/Services';
import GuideForm from '../../guides/GuideForm';
import TravelBlogs from '../../travel-blogs/TravelBlogs';
import BlogForm from '../../travel-blogs/BlogForm';
import RentForm from '../../rent/RentForm';
import AuthContext from "../../auth/AuthContext";
import Homepage from "./Homepage";
import TripGroups from "../../trip-groups/TripGroups";

const Body = () => {

    const { getLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const[user,setUser] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[emailError,setEmailError] = useState('');
    const[passwordError,setPasswordError] = useState('');
    const[hasAccount,setHasAccount] = useState('');

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };

    const clearErrors = () =>{
        setEmailError("");
        setPasswordError("");
    }
    const handleLogin = () => {
        clearErrors();
        Fire
            .auth()
            .signInWithEmailAndPassword(email,password)
            .catch(err => {
                switch(err.code)
                {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;  
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;    
                }
            });
        getLoggedIn(user);    
        navigate("/TripShrip/TripShrip");
    };

    const handleSignup = () => {
        clearErrors();
        Fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .catch(err => {
                switch(err.code)
                {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;    
                }
            });
        getLoggedIn(user);
        navigate("/TripShrip/TripShrip");
    };

    const handleLogout = () =>{
            // Fire.auth().signOut();
            Fire.auth().signOut().then(function() {
                // Sign-out successful.
                getLoggedIn(undefined);
              }).catch(function(error) {
                // An error happened.
              });
            getLoggedIn(undefined);
            navigate("/TripShrip/TripShrip");  
    };

    const authListener = () =>{
        Fire.auth().onAuthStateChanged(user => {
            if(user)
            {
                clearInputs();
                setUser(user);
                getLoggedIn(user);
            }else {
                setUser("");
                getLoggedIn(undefined);
            }
        });
    };

    useEffect(() => {
        authListener();
    },[])
    return(
    <Box sx={ { backgroundColor: "#fafafa"}}>
        <Header  handleLogout={handleLogout}/>
            <Routes>
                <Route exact path="/TripShrip/" element={<Homepage />} />
                <Route exact path="/TripShrip/login" element={<Loginform 
                  email={email} 
                  setEmail={setEmail} 
                  password = {password} 
                  setPassword={setPassword} 
                  handleLogin={handleLogin}
                  handleSignup={handleSignup}
                  hasAccount={hasAccount}
                  setHasAccount={setHasAccount}
                  emailError={emailError}
                  passwordError = {passwordError}
                  />} />
                <Route exact path="/TripShrip/groups" element={<> Your Groups </>} />
                <Route exact path="/TripShrip/services" element={<Services />} />
                <Route exact path="/TripShrip/services/guides/:city" element={<Guide />} />
                <Route exact path="/TripShrip/services/parking/:city" element={<Parking />} />
                <Route exact path="/TripShrip/services/rent/:city" element={<Rent />} />
                <Route exact path="/TripShrip/travel_blogs" element={<TravelBlogs />} />
                <Route exact path="/TripShrip/travel_blogs/add_blog" element={<BlogForm />} />
                <Route exact path="/TripShrip/guide_register" element={<GuideForm />} />
                <Route exact path="/TripShrip/rent_register" element={<RentForm />} />
                <Route exact path="/TripShrip/trip_groups" element={<TripGroups />} />
            </Routes>
        <Footer />
    </Box>
    );
};

export default Body;