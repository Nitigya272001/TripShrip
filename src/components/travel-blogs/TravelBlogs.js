import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import BlogsList from './BlogsList';
const TravelBlogs = () => {
    return (
        <Grid container alignItems='center' sx={{padding:'10px',minHeight:'90vh'}}> 
            <Grid container sx={{height:'8vh',paddingRight:'20px'}} >
                <Grid item>
                    <Button variant="outlined" component={Link} to="/travel_blogs/add_blog">
                        Add Your Blog
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{height:'75vh'}}>
                <Grid item >
                    <BlogsList />
                </Grid>
            </Grid>
        </Grid>
    )
};

export default TravelBlogs;