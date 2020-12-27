import { Button, Card, CircularProgress, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import { useParams } from 'react-router-dom';

export default function Chat(){

    const [user,setUser]=useState();
    const [gettingUser,setgettingUser]=useState(true);
    const [msg,setMsg]=useState();
    const [receivedMsg,setReceivedMsg]=useState([]);

    let params = useParams();

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            let user_obj={};
            user_obj.id=user.uid;
            user_obj.email=user.email;
            user_obj.photoURL=user.photoURL;
            user_obj.name=user.displayName;
            setUser(user_obj);
            setgettingUser(false);
          })
          getMsg();
    },[true])

    const handleChange=(event)=>{
        setMsg(event.target.value);
    }

    const onWriteMsgToDb=async()=>{
        try {
            await firebase.database().ref(params.chatId).push({
              content: msg,
              timestamp: Date.now(),
              uid: user.id
            });
          } catch (error) {
              console.log(error)
          }
    }

    const getMsg=()=>{
        try {
            firebase.database().ref(params.chatId).on("value", snapshot => {
              let chats = [];
              snapshot.forEach((snap) => {
                chats.push(snap.val());
              });
              setReceivedMsg(chats);
            });
          } catch (error) {
            console.log(msg);
        }
    }

    const onSendMsg=()=>{
        onWriteMsgToDb().finally(function (res){
            console.log(res);
        }).catch(function(error){
            console.log(error);
        })
    }

    return(
        <div>
            {gettingUser? <CircularProgress/>:
            <div style={{margin:20}}>
                <Card style={{padding:20}}>
                <div>
                    <div className={receivedMsg.uid==user.id?"my-msg":"other-msg"}>
                        {receivedMsg.length?
                        receivedMsg.map((item)=>
                        <p>{item.content}</p>
                        ):''
                        }
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs="9" sm="9">
                            <TextField 
                                id="msg" 
                                label="Enter Message" 
                                color="secondary"
                                variant="filled"
                                helperText="Please Enter Message"
                                placeholder="Enter Message"
                                value={msg}
                                error={false}
                                disabled={false}
                                onChange={handleChange}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item xs="3" sm="3">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={onSendMsg}
                                >
                                    Send
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                </Card>
            </div>
            }
        </div>
    )
}