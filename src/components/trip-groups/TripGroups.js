import React from 'react'
import { Grid } from '@mui/material';
import NewGroupCard from './NewGroupCard';
import GroupCard from './GroupCard';

const TripGroups = () => {
  return (
    <Grid container style={{padding:"8px",minHeight:"94vh"}} spacing={2} alignItems="center">
          <Grid item sm="4" xs="10"><NewGroupCard /></Grid>
          <Grid item sm="4" xs="10"><GroupCard name="Trip to Goa"/></Grid>
          <Grid item sm="4" xs="10"><GroupCard name="Trip to Goa"/></Grid>
          <Grid item sm="4" xs="10"><GroupCard name="Trip to Goa"/></Grid>
          <Grid item sm="4" xs="10"><GroupCard name="Trip to Goa"/></Grid>
    </Grid>
  )
}

export default TripGroups;