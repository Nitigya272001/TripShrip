import React, {useContext,useEffect} from 'react'
import { AppBar, Toolbar, Typography, Button, Icon } from "@mui/material";
import {Link, useLocation} from 'react-router-dom';
import './Header.styles.css';
import AuthContext from '../../auth/AuthContext';

const classes = {
    root: {
      padding: 0,
      margin: 0,
      background: '#000000',
      flexGrow: 1,
      fontFamily: "Dosis",
    },
    root2:{
      background: '#000000',
    },
    menuButton: {
      height: "6vh",
      marginRight: "5px",
      textAlign: "center",
      fontSize: "1.3rem"
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
      fontSize: "2.2rem"
    },
    logo: {
      width: "50px",
      height: "50px",
      marginRight: '10px'
    }
}

function Header(props) {

  const { loggedIn } = useContext(AuthContext);
  const location = useLocation()
  const headerPostion = location.pathname === '/' ? 'static' : 'relative';
  
    return (
      <div style={classes.root} className="header-section">
      <AppBar style={classes.root2} position = {headerPostion}>
        <Toolbar>
            <Icon />
          <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg" alt="Kitty Katty!" style={classes.logo} />
          <Typography variant="h6" style={classes.title}>
            TripShrip
          </Typography>
          {loggedIn === undefined ?
            <>
            <Button style={classes.menuButton} color="inherit"><Link to="/login" style={{textDecoration:'none', color:'white'}}>Login</Link></Button>
            </>
            :
            <Button style={classes.menuButton} color="inherit" onClick={props.handleLogout}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default Header;