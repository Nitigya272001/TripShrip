import React from "react";
import { Link } from "react-router-dom";
import {Card, CardActions,CardHeader,Avatar,IconButton , CardContent,CardMedia, Button, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import {Favorite} from '@mui/icons-material'

const BlogCard = (props) => {
    return (
        <>
        <Card sx={{boxShadow:6, marginTop: 3,marginLeft:4, marginRight:4 ,marginBottom:4,width:'600px' }}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            
          </IconButton>
        }
        title={props.title}
      />
                <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="blog image"
      />
       <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.description}
        </Typography>
      </CardContent>
                <CardActions>
                    <Typography>{props.likes} Likes</Typography>
                </CardActions>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <CardActions>
                    <Button size="small" component={Link} to={props.linkTo}>Read More</Button>
                </CardActions>
            </Card>
        </>
    )
};

export default BlogCard;