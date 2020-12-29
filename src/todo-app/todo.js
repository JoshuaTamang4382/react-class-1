import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { firestore } from "firebase"
import firebase from "firebase"
import { Button, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

export default function Todo() {

    let params = useParams();
    let history = useHistory();
    const [todo,setTodo]=useState({title:"",detail:""});
    const [isSaving,setIsSaving] = useState(false);

    useEffect(()=>{
        if(params.id!='add'){
            getDatabyId();
        }
    },[true])

    function handleChange(event) {
        todo[event.target.id]=event.target.value;
        console.log(todo);
        setTodo({...todo,todo});
    }

    const getDatabyId=()=>{
        const firestore = firebase.firestore();

        var docRef = firestore.collection("todo-list").doc("/"+params.id);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                todo.title=doc.data().title;
                todo.detail=doc.data().detail;
                setTodo({...todo,todo});
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
        console.log(params.id);
        setIsSaving(true);
        const firestore = firebase.firestore();
        if(params.id==='add'){
        
        firestore.collection("todo-list").add({
            title : todo.title,
            detail : todo.detail,
        }).then(function (response){
            setIsSaving(false);
            history.push('/todo-list');
            
        }).catch(function(error){
            setIsSaving(false);
            console.log('text');
        })
        }else{
            firestore.collection("todo-list").doc(params.id).update({
                title : todo.title,
                detail : todo.detail,
            }).then(function (response){
                setIsSaving(false);
                history.push('/todo-list');
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
                        id="title" 
                        label="Enter title" 
                        color="primary"
                        variant="filled"
                        helperText="Please Enter valid title"
                        placeholder="Enter Full title"
                        value={todo.title}
                        error={false}
                        disabled={isSaving}
                        onChange={handleChange}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <div style={{marginTop:20}}>
                <TextField 
                    id="detail" 
                    label="Enter detail" 
                    color="primary"
                    variant="filled"
                    helperText="Please Enter full detail"
                    placeholder="Enter Full detail"
                    value={todo.detail}
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
                <Button variant="contained" color="primary" onClick={handleSaveData} disabled={isSaving}>
                    Save
                </Button>
            </div>
        </div>
    )
}
