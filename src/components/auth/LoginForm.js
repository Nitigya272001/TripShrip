import React from "react";
import { Container, Box, Paper, Button, TextField, Typography, Grid } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Fire from '../../Firebase/Fire';

const Loginform = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError } = props;

        const forgotPassword = (Email) => {

            if(Email === null || Email === undefined) alert("error");
            else {
                Fire.auth().sendPasswordResetEmail(Email)
                .then(function () {
                    alert('Please check your email...')
                }).catch(function (e) {
                    alert(e);
                }) 
            }
        }
            

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color : "blueviolet",
            minHeight: "92vh"
        },
    }));
    const classes = useStyles();
    return (
        <>
            <Container className={classes.root}>
                <Paper component={Box} p={4} boxShadow={10}>
                    <Typography variant = "h5" justifyContent="space-between" >Welcome, get yourself in!</Typography>
                    <form>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            margin="normal"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth />
                        {emailError  ? (
                            <>
                                <p className="errorMsg">{emailError}</p>
                            </>
                        ) : (
                            null
                        )}
                        <TextField
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            type="password"
                            margin="normal"
                            fullWidth
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        {passwordError  ? (
                            <>
                                <p className="errorMsg">{passwordError}</p>
                            </>
                        ) : (
                            null
                        )}
                        {hasAccount ? (
                            <>
                                <Button variant="contained" fullWidth onClick={handleLogin}>Sign in</Button>
                                <Grid container justifyContent="space-between">
                                    <Grid item><Button size="small" variant="text" onClick={() => forgotPassword(email)}>Forgot Password</Button></Grid>
                                    <Grid item>Don't have an account?
                                        <span
                                            onClick={() => setHasAccount(!hasAccount)}>
                                            <Button size="small" variant="text">Sign up</Button>
                                        </span>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Button variant="contained" fullWidth onClick={handleSignup}>Sign up</Button>
                                <p>Already have an account ? 
                                    <span 
                                        onClick={() => setHasAccount(!hasAccount)}>
                                        <Button variant="text">Sign in</Button>
                                    </span>
                                </p>
                            </>
                        )}
                    </form>
                </Paper>
            </Container>
        </>


    )
};

export default Loginform;