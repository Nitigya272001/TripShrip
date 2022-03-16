import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link} from 'react-router-dom'
import AuthContext from '../../auth/AuthContext';

export default function FeatureCard({title,description,linkTo}) {

    const { loggedIn } = React.useContext(AuthContext);

    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {
            loggedIn === undefined ?
            <Button size="small" color="primary" component={Link} to={"/login"}>
                Click Here
                <i class="material-icons right">send</i>
            </Button>
            :
            <Button size="small" color="primary" component={Link} to={linkTo}>
                Click Here
                <i class="material-icons right">send</i>
            </Button> 
          }
        </CardActions>
      </Card>
    );
  }