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
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    // padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    // margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    // "&:not(:first-of-type)": {
    //   marginLeft: -muiBaseTheme.spacing.unit
    // }
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
            {name}
          </Typography>
          <Divider className={classes.divider} light />
          {faces.map(face => (
            <Avatar className={classes.avatar} key={face} src={face} />
          ))}
        </CardContent>
      </Card>
  );
}

const GroupCard = withStyles(styles)(GCard);
export default GroupCard;
