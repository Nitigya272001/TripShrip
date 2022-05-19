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
import HomeStay from '../../home-stay/HomeStay';
import HomeStayForm from '../../home-stay/HomeStayForm';
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
            .then(() => {
                getLoggedIn(user);    
                navigate("/");
            })
            .catch(err => {
                switch(err.code)
                {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError("Username Invalid");
                        break;  
                    case "auth/wrong-password":
                        setPasswordError("Wrong Password");
                        break;    
                }
            });
    };

    const handleSignup = () => {
        clearErrors();
        Fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then((userCredential) => {
                userCredential.user.sendEmailVerification();
                Fire.auth().signOut();

                alert("Check the email sent to you and verify it.");
            })
            .catch(err => {
                switch(err.code)
                {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError("Invalid Email");
                    case "auth/weak-password":
                        setPasswordError("Password Error, Try strong one!");
                        break;
                    default:
                        break;
                }
            });
    };

    const handleLogout = () =>{
            // Fire.auth().signOut();
            Fire.auth().signOut().then(function() {
                // Sign-out successful.
                getLoggedIn(undefined);
                navigate("/");  
              }).catch(function(error) {
                // An error happened.
              });
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
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<Loginform 
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
                <Route exact path="/groups" element={<> Your Groups </>} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/services/guides/:city" element={<Guide />} />
                <Route exact path="/services/home_stay/:city" element={<HomeStay />} />
                <Route exact path="/services/parking/:city" element={<Parking />} />
                <Route exact path="/services/rent/:city" element={<Rent />} />
                <Route exact path="/travel_blogs" element={<TravelBlogs />} />
                <Route exact path="/travel_blogs/add_blog" element={<BlogForm />} />
                <Route exact path="/guide_register" element={<GuideForm />} />
                <Route exact path="/rent_register" element={<RentForm />} />
                <Route exact path="/home_stay_add" element={<HomeStayForm />} />
                <Route exact path="/trip_groups" element={<TripGroups />} />
            </Routes>
        <Footer />
    </Box>
    );
};

export default Body;