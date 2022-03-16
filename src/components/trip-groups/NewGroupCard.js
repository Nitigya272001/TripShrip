import React from "react";
import { withStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];

const styles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  content: {
    textAlign: "center",
    // padding: muiBaseTheme.spacing.unit * 3
  },
  add_new_icon : {
    transform: 'scale(1.8)',
  }
});

function GCard({ classes, name }) {
  return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            Create/Join New Group
          </Typography>
          <i className={`material-icons ${classes.add_new_icon}`}>add</i>
        </CardContent>
      </Card>
  );
}

const NewGroupCard = withStyles(styles)(GCard);
export default NewGroupCard