import React from "react";
import { Container, Box, Paper, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
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
                <Paper component={Box} mx="auto" p={4} boxShadow={10}>
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

                        <p className="errorMsg">{emailError}</p>
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

                        <p className="errorMsg">{passwordError}</p>

                        <div >
                            {hasAccount ? (
                                <>
                                    <Button variant="contained" onClick={handleLogin}>Sign in</Button>
                                    <p>Don't have an account ?
                                        <span
                                            onClick={() => setHasAccount(!hasAccount)}>
                                            <Button variant="text">Sign up</Button>
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <Button variant="contained" onClick={handleSignup}>Sign up</Button>
                                    <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}><Button variant="text">Sign in</Button></span></p>
                                </>
                            )}
                        </div>

                    </form>
                </Paper>
            </Container>
        </>


    )
};

export default Loginform;