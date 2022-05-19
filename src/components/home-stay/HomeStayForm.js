import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Fire from "../../Firebase/Fire"
import axios from "axios"
import { Paper, Box, Typography, TextField, Grid, Button, } from "@mui/material";

const HomeStayForm = () => {
  const [img,setImg]=useState()
    const [homestay, sethomestay] = useState({
        name: "",
        address: "",
        city:"",
        description: "",
        image : "",
        price : "",
        contact: "",
    }
    );
    const navigate = useNavigate();
    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        sethomestay({ ...homestay, [name]: value })
    };
    const getImage = (files)=>{
        const formdata =new FormData();
        formdata.append("file",files[0]);
        formdata.append("upload_preset","minorproject")
        axios.post("https://api.cloudinary.com/v1_1/diuazm4pi/image/upload",formdata).then((res)=>{
            setImg(res.data.secure_url);
            console.log(img);
        })
    }
    const postData = async (e) => {
        e.preventDefault();

        let res = 0;
        const { name,address,city,description,price,contact } = homestay;
        if ((name && contact && price)) {
            let collectionName = city.toLowerCase() + "-home-stays";
            Fire.firestore().collection(collectionName).add({
                name:name,
                address:address,
                description:description,
                price:price,
                contact:contact,
                images : img
            });
            res = true;
        }
        if (res) {
            alert("Thanks for adding your home. Stay verified!");
            navigate('/');
        }
        else {
            alert('Please fill complete form');
        }
    };
    return (
        <>
            <Paper component={Box} mx="auto" p={4}>
                <Typography variant="h5" gutterBottom>Add Your Home for Home Stay</Typography>

                <form onSubmit={postData}>
                    <Grid container spacing={5}>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                name="name"
                                label="Name"
                                type="text"
                                value={homestay.name}
                                placeholder="Enter Your Name"
                                onChange={getUserData}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container marginTop={5}>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                name="address"
                                label="Address"
                                type="text"
                                value={homestay.address}
                                placeholder="Enter the address of the place"
                                onChange={getUserData}
                                required
                                fullWidth
                                size="medium"
                            />
                        </Grid>
                        <Grid item marginLeft={4}>
                            <TextField
                                variant="outlined"
                                name="city"
                                label="City"
                                type="text"
                                value={homestay.city}
                                placeholder="Enter the city of the place"
                                onChange={getUserData}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item marginTop={4}>
                            <TextField
                                variant="outlined"
                                name="description"
                                label="Places' Details"
                                type="text"
                                value={homestay.description}
                                placeholder="Describe the place"
                                onChange={getUserData}
                                required
                                multiline
                                rows={6}
                                maxRows={20}
                                fullWidth
                            />
                        </Grid>

                        <Grid item marginTop={4}>
                            <TextField
                                variant="outlined"
                                name="contact"
                                label="Contact Number"
                                type="text"
                                value={homestay.contact}
                                placeholder="Enter your contact details"
                                onChange={getUserData}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item marginTop={4}>
                            <TextField
                                variant="outlined"
                                name="price"
                                label="Price"
                                type="text"
                                value={homestay.price}
                                placeholder="Enter the price"
                                onChange={getUserData}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item marginTop={4}>
                          <input type="file" name="image" onChange={(event)=>{getImage(event.target.files);}} />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        marginTop={3}>
                        Submit
                    </Button>
                </form>
            </Paper>

        </>
    )
}

export default HomeStayForm