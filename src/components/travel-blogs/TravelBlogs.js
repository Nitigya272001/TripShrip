import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import BlogsList from './BlogsList';
const TravelBlogs = () => {
    return (
        <Grid container alignItems='center' justifyContent='center' sx={{padding:'10px'}}> 
            <Grid item container justifyContent='center' sx={{height:'8vh',paddingRight:'20px',width:"100%"}} >
                <Grid item>
                    <Button variant="contained"  color="primary" component={Link} to="/travel_blogs/add_blog">
                        Add Your Blog
                    </Button>
                </Grid>
            </Grid>
            <Grid item container  justifyContent='center' sx={{minHeight:'75vh' ,width:"100%"}}>
                <Grid item >
                    <BlogsList />
                </Grid>
            </Grid>
        </Grid>
    )
};

export default TravelBlogs;