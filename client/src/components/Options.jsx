import React,{useState,useContext} from "react";
import { Typography,Grid,Container,Paper,TextField,Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Assignment,Phone,PhoneDisabled} from "@material-ui/icons";
import { SocketContext } from "../SocketContext";
import { Socket } from "socket.io-client";


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
   }));


const Options=({children})=>{
    const classes=useStyles();
    const{me,callAccepted,name,setName,callEnded,leaveCall,callUser}=useContext(SocketContext);
    const[idToCall,setIdToCall]=useState('');
    return(
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid conatiner className={classes.gridContainer}>
                        <Typography gutterBottom varient="h6">Account Info</Typography>
                        <TextField label="Name" value={name} onChange={(e)=>setName(e.target.value)} fullWidth/>
                        <CopyToClipboard text={me} className={classes.margin}>
                            <Button varient="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large"/>}>
                                COPY YOUR ID
                            </Button>
                        </CopyToClipboard>
                    </Grid>
                    <Grid conatiner className={classes.gridContainer}>
                        <Typography gutterBottom varient="h6">Make a call</Typography>
                        <TextField label="ID to call" value={idToCall} onChange={(e)=>setIdToCall(e.target.value)} fullWidth/>
                        {callAccepted && !callEnded ?(
                        <Button variant="conatained" color="secondary" startIcon={<PhoneDisabled fontSize="large"/>} fullWidth
                        onClick={leaveCall} className={classes.margin}>
                            HangUp
                        </Button>
                        ):
                        (
                            <Button variant="conatained" color="primary" startIcon={<Phone fontSize="large"/>} fullWidth
                            onClick={()=>{callUser(idToCall)}} className={classes.margin}>
                                Call
                            </Button>
                        )}
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}
export default Options;