import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Fire from "../../Firebase/Fire"
import axios from "axios"

// import './Interviewie.css';

import { Paper, Box, Typography, TextField, Grid, Button, } from "@mui/material";
const BlogForm = () => {
    const [img,setImg]=useState()
    const [blog, setblog] = useState({
        name: "",
        title: "",
        blogtext: "",
        image : "",
        likes : 0,
    }
    );
    const navigate = useNavigate();
    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setblog({ ...blog, [name]: value })
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
        const { title, blogtext, name, image, likes } = blog;
        if ((title && blogtext && name)) {
            let collectionName = "travel-blogs"
            Fire.firestore().collection(collectionName).add({
                title: title,
                blogtext: blogtext,
                name: name,
                likes: likes,
                images : img
            });
            res = true;
        }
        if (res) {
            alert("Thanks for sharing your experience!");
            navigate('/travel_blogs');
        }
        else {
            alert('Please fill complete form');
        }
    };
    return (
        <>
            <Paper component={Box} mx="auto" p={4}>
                <Typography variant="h5" gutterBottom>Add Your Blog by filling following details</Typography>

                <form onSubmit={postData}>
                    <Grid container spacing={5}>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                name="name"
                                label="Name"
                                type="text"
                                value={blog.name}
                                placeholder="Enter Your Name"
                                onChange={getUserData}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid marginTop={5}>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                name="title"
                                label="Blog's Title"
                                type="text"
                                value={blog.title}
                                placeholder="Enter Your Title"
                                onChange={getUserData}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item marginTop={4}>
                            <TextField
                                variant="outlined"
                                name="blogtext"
                                label="Blog's Details"
                                type="text"
                                value={blog.blogtext}
                                placeholder="Enter Your Blog"
                                onChange={getUserData}
                                required
                                multiline
                                rows={6}
                                maxRows={20}
                                fullWidth
                            />
                        </Grid>
                        <Grid item marginTop={4}>
                          <input type="file" name="image"  onChange={(event)=>{getImage(event.target.files);}} />
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
};

export default BlogForm;