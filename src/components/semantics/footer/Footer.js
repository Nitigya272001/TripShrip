import React from 'react'
import { AppBar, Toolbar, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
import './Footer.styles.css';

const classes = {
    root: {
      padding: 0,
      margin: 0,
      background: '#000000',
      flexGrow: 1,
      height: "10vh",
      fontFamily: "Dosis",
    },
    root2:{
      background: '#000000',
      height: "10vh",
    },
    title: {
      flexGrow: 1,
      textAlign: "center"
    }
}

function Footer(props) {
    return (
      <div style={classes.root} className='navbar-fixed'>
      <AppBar style={classes.root2} position="static">
        <Toolbar>
          <Typography variant="h5" style={classes.title}>
            @Copyright - TripShrip
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default Footer;