import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

export default function TodoList() {

    let history=useHistory();
    const [todo,setTodo] = useState();
    const [loading,setLoading] = useState(true);
    const [open,setOpen] = useState(false);
    const [isDeleting,setDeleting] = useState(false);
    const [selectedDoc,setSelectedDoc] = useState();

    const getTodoListFromFireBase= async ()=>{
        const firestore = firebase.firestore()
        const snapshot = await firestore.collection('todo-list').get();
        console.log(snapshot.docs.map(doc => doc)[0].data());
        return snapshot.docs.map(doc => doc);
    }

    useEffect(()=>{
        todoFeedbackData();        
    },[true])

    const todoFeedbackData=()=>{
        getTodoListFromFireBase().then(function (data) {
            setTodo(data);
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
        firestore.collection("todo-list").doc("/"+selectedDoc).delete().then(function(response) {
            todoFeedbackData();
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
            <Button variant="contained" color="primary" onClick={()=>history.push('/todo/add')}>
                Add Todo
            </Button>
            
            {loading ? <div>loading...</div> : 
            <List>
                {todo.map((item)=>
                    <ListItem>
                        <ListItemText primary={item.data().title} secondary={item.data().detail}
                        onClick={()=>history.push('/todo/'+item.id)}/>
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