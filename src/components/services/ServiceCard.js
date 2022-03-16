import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link} from 'react-router-dom'

export default function ServiceCard({title,linkTo}) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" component={Link} to={linkTo}>
                Click Here
                <i class="material-icons right">send</i>
          </Button>
        </CardActions>
      </Card>
    );
  }