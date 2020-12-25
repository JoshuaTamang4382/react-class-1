import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { firestore } from "firebase"
import firebase from "firebase"
import { Button, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

export default function UserProfile() {

    let params = useParams();
    let history = useHistory();
    const [userProfile,setUserProfile]=useState({name:"",address:"",email:"",bio:"",phone:"",occupation:""});
    const [isSaving,setIsSaving] = useState(false);

    useEffect(()=>{
        if(params.id!='add'){
            getDatabyId();
        }
    },[true])

    function handleChange(event) {
        userProfile[event.target.id]=event.target.value;
        console.log(userProfile);
        setUserProfile({...userProfile,userProfile});
    }

    const getDatabyId=()=>{
        const firestore = firebase.firestore();

        var docRef = firestore.collection("user-feedback").doc("/"+params.id);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                userProfile.name=doc.data().name;
                userProfile.address=doc.data().address;
                userProfile.email=doc.data().email;
                userProfile.phone=doc.data().phone;
                userProfile.occupation=doc.data().occupation;
                userProfile.bio=doc.data().bio;
                setUserProfile({...userProfile,userProfile});
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        }

    const handleSaveData=()=>{
        setIsSaving(true);
        const firestore = firebase.firestore();
        if(params.id==='add'){
        
        firestore.collection("user-feedback").add({
            name : userProfile.name,
            address : userProfile.address,
            email : userProfile.email,
            bio : userProfile.bio,
            phone : userProfile.phone,
            occupation : userProfile.occupation
        }).then(function (response){
            setIsSaving(false);
            history.push('/user-list');
        }).catch(function(error){
            setIsSaving(false);
        })
        }else{
            firestore.collection("user-feedback").doc(params.id).update({
                name : userProfile.name,
                address : userProfile.address,
                email : userProfile.email,
                bio : userProfile.bio,
                phone : userProfile.phone,
                occupation : userProfile.occupation
            }).then(function (response){
                setIsSaving(false);
                history.push('/user-list');
            }).catch(function(error){
                setIsSaving(false);
            })
        }
    }

    return(
        <div style={{margin:30}}>
            <Grid container spacing={2}>
                <Grid item xs="6" sm="4" style={{marginTop:20}}>
                    <TextField 
                        id="name" 
                        label="Enter Name" 
                        color="secondary"
                        variant="filled"
                        helperText="Please Enter valid name"
                        placeholder="Enter Full Name"
                        value={userProfile.name}
                        error={false}
                        disabled={isSaving}
                        onChange={handleChange}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs="6" sm="4" style={{marginTop:20}}>
                    <TextField 
                        id="address" 
                        label="Enter Address" 
                        color="secondary"
                        variant="filled"
                        helperText="Please Enter valid address"
                        placeholder="Enter Full Address"
                        value={userProfile.address}
                        error={false}
                        disabled={isSaving}
                        onChange={handleChange}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs="6" sm="4" style={{marginTop:20}}>
                    <TextField 
                        id="email" 
                        label="Enter Email" 
                        color="secondary"
                        variant="filled"
                        helperText="Please Enter valid email"
                        placeholder="Enter Full Name"
                        value={userProfile.email}
                        error={false}
                        disabled={isSaving}
                        onChange={handleChange}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                    <Grid item xs="6" sm="4" style={{marginTop:20}}>
                        <TextField 
                            id="phone" 
                            label="Enter Phone" 
                            color="secondary"
                            variant="filled"
                            helperText="Please Enter valid phone number"
                            placeholder="Enter Phone"
                            value={userProfile.phone}
                            error={false}
                            rowsMax={5}
                            multiline={true}
                            disabled={isSaving}
                            onChange={handleChange}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs="6" sm="4" style={{marginTop:20}}>
                        <TextField 
                            id="occupation" 
                            label="Enter Occupation" 
                            color="secondary"
                            variant="filled"
                            helperText="Please Enter Occupation"
                            placeholder="Enter occupation"
                            value={userProfile.occupation}
                            error={false}
                            disabled={isSaving}
                            onChange={handleChange}
                            fullWidth={true}
                        />
                    </Grid>
            </Grid>
            <div style={{marginTop:20}}>
                <TextField 
                    id="bio" 
                    label="Enter Bio" 
                    color="secondary"
                    variant="filled"
                    helperText="Please Enter valid name"
                    placeholder="Enter Full Name"
                    value={userProfile.bio}
                    error={false}
                    rowsMax={5}
                    rows={3}
                    multiline={true}
                    disabled={isSaving}
                    onChange={handleChange}
                    fullWidth={true}
                />
            </div>
            <div style={{marginTop:20}}>
                {isSaving? <CircularProgress/>:""}
                <Button variant="contained" color="secondary" onClick={handleSaveData} disabled={isSaving}>
                    Save
                </Button>
            </div>
        </div>
    )
}
{/* <Card>
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
</Card> */}