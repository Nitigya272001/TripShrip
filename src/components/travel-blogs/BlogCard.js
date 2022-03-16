import React from "react";
import { Link } from "react-router-dom";
import {Card, CardActions, CardContent, Button, Typography } from '@mui/material';
const BlogCard = (props) => {
    return (
        <>
        <Card sx={{boxShadow:6, marginTop: 3,marginLeft:4, marginRight:4 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title} 
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to={props.linkTo}>Read it</Button>
                </CardActions>
            </Card>
        </>
    )
};

export default BlogCard;