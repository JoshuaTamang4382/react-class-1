import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

export default function UserProfileList() {

    let history=useHistory();
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const [open,setOpen] = useState(false);
    const [isDeleting,setDeleting] = useState(false);
    const [selectedDoc,setSelectedDoc] = useState();

    const getUserListFromFireBase= async ()=>{
        const firestore = firebase.firestore()
        const snapshot = await firestore.collection('user-feedback').get();
        console.log(snapshot.docs.map(doc => doc)[0].data());
        return snapshot.docs.map(doc => doc);
    }

    useEffect(()=>{
        userFeedbackData();        
    },[true])

    const userFeedbackData=()=>{
        getUserListFromFireBase().then(function (data) {
            setUser(data);
            setLoading(false);
            console.log(data);
        })
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const onDeleteItem=()=>{
        setDeleting(true);
        const firestore = firebase.firestore()
        firestore.collection("user-feedback").doc("/"+selectedDoc).delete().then(function(response) {
            userFeedbackData();
            setDeleting(false);
        }).catch(function(error) {
            setDeleting(false);
            console.error("Error removing document: ", error);
        });
        setOpen(false);
    }

    const onSelectedDocForDelete=(id)=>{
        console.log(id);
        setSelectedDoc(id);
        setOpen(true);
    }

    return(
        <div>
            <Button variant="contained" color="secondary" onClick={()=>history.push('/user-profile/add')} >
                Add More Feedback
            </Button>
            {loading ? <div>loading...</div> : 
            <List>
                {user.map((item)=>
                    <ListItem>
                        <ListItemText primary={item.data().name} secondary={item.data().email} 
                        onClick={()=>history.push('/user-profile/'+item.id)}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={()=>onSelectedDocForDelete(item.id)}/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Do you want to delete?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You cannot undo this section
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" disabled={isDeleting}>
                    Disagree
                </Button>
                <Button onClick={onDeleteItem} color="primary" autoFocus disabled={isDeleting}>
                    Agree
                </Button>
                {isDeleting? <CircularProgress/>:""}
                </DialogActions>
            </Dialog>
        </div>
    )
}