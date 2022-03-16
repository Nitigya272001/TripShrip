import React from 'react'
import { Grid } from '@mui/material';
import NewGroupCard from './NewGroupCard';
import GroupCard from './GroupCard';

const TripGroups = () => {
  return (
    <Grid container style={{minHeigh:"90vh"}}>
        <Grid item container> 
            <Grid item> Your Groups </Grid>
        </Grid >
        <Grid item container style={{minHeigh:"90vh"}}> 
            <NewGroupCard />
            <GroupCard name="Trip to Goa"/>
            <GroupCard name="Trip to Goa"/>
            <GroupCard name="Trip to Goa"/>
            <GroupCard name="Trip to Goa"/>
            <GroupCard name="Trip to Goa"/>
            <GroupCard name="Trip to Goa"/>
        </Grid >
    </Grid>
  )
}

export default TripGroups;