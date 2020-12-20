import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

export default function UserProfile() {

    const [userProfile,setUserProfile]=useState({name:"",address:"",email:""});

    function handleChange(event) {
        userProfile[event.target.id]=event.target.value;
        console.log(userProfile);
        setUserProfile({...userProfile,userProfile});
    }

    return(
        <div>
            <Grid container spacing={2}>
                        <Grid item xs="6" sm="4">
                            <TextField 
                                id="name" 
                                label="Enter Name" 
                                color="secondary"
                                variant="filled"
                                helperText="Please Enter valid name"
                                placeholder="Enter Full Name"
                                value={userProfile.name}
                                error={false}
                                disabled={false}
                                onChange={handleChange}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item xs="6" sm="4">
                            <TextField 
                                id="address" 
                                label="Enter Address" 
                                color="secondary"
                                variant="filled"
                                helperText="Please Enter valid address"
                                placeholder="Enter Full Address"
                                value={userProfile.address}
                                error={false}
                                disabled={false}
                                onChange={handleChange}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item xs="6" sm="4">
                            <TextField 
                                id="email" 
                                label="Enter Email" 
                                color="secondary"
                                variant="filled"
                                helperText="Please Enter valid email"
                                placeholder="Enter Full Name"
                                value={userProfile.email}
                                error={false}
                                disabled={false}
                                onChange={handleChange}
                                fullWidth={true}
                            />
                        </Grid>
                </Grid>
            <Card>
                <Grid container spacing={2}>
                    <Grid item xs="6" sm="6">Name</Grid>
                    <Grid item xs="6" sm="4">{userProfile.name}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs="6" sm="6">Address</Grid>
                    <Grid item xs="6" sm="4">{userProfile.address}</Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs="6" sm="6">Email</Grid>
                    <Grid item xs="6" sm="4">{userProfile.email}</Grid>
                </Grid>
            </Card>
        </div>
    )
}