import { Button, Card, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CustomDialog from './customDialog';

export default function  TimerApp() {

    const [time,setTime]=useState();
    const [timer,setTimer]=useState();
    const [isAlert,setIsAlert]=useState();
    const [openDialog,setOpenDialog]=useState(false);
    let [secondCount,setSecondCount]=useState(0);

    function handleChange(event) {
        setTime(event.target.value);
    }

    function runTimer(){
        setTimer(setInterval(function () {
            if(secondCount==time){
                alert('Timer');
                setIsAlert(!isAlert);
                setSecondCount(0)
                setTime(0);
                setOpenDialog(true)
            }else{
                setSecondCount(secondCount++);
            }
        },1000));
    }

    useEffect(()=>{
        console.log('12345');
        clearInterval(timer);
    },[isAlert]);

    function onCloseDialog() {
        setOpenDialog(false);
    }

    return(
        <div style={{maxWidth:600,margin:'auto'}}>
            <h1>This is timer App</h1>
            <Grid container spacing={2}>
                        <Grid item xs="9" sm="9">
                             <TextField 
                                id="time" 
                                onChange={handleChange}
                                value={time}
                                label="Please select your time" 
                                helperText="Set timer in the basis of second"
                                fullWidth={true}
                                type="number"
                                variant="filled" />
                        </Grid>
                    <Grid item xs="3" sm="3">
                        <Button onClick={runTimer}>Start Timer</Button>
                    </Grid>
                </Grid>
            <div>
                <Card>
                    <h1 style={{textAlign:'center'}}>{secondCount}</h1>
                </Card>
            </div>
            <CustomDialog openDialog={openDialog} onCloseDialog={onCloseDialog}
                dialogContent={
                    <div>
                        Alert !
                    </div>
                }
            />
        </div>
    )
}