import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Fire from "../../Firebase/Fire"
// import './Interviewie.css';
import { Paper, Box, Typography, TextField, Grid, Button, } from "@mui/material";
const BlogForm = () => {
    const [blog, setblog] = useState({
        title: "",
        blogtext: "",
        name: "",
        images : "",
        location : "",
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
    const postData = async (e) => {
        e.preventDefault();

        let res = 0;
        const { title, blogtext, name, images, location, likes } = blog;
        if ((title && blogtext && name && location)) {
            let collectionName = "travel-blogs"
            Fire.firestore().collection(collectionName).add({
                title: title,
                blogtext: blogtext,
                name: name,
                location: location,
                likes: likes,
                images : images
            });
            res = true;
        }
        if (res) {
            alert("Thanks for sharing your experience!");
            navigate('/blog');
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
                            Upload some images(optional)
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