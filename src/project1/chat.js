import { Avatar, Button, Card, CardHeader, CircularProgress, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import { useHistory, useParams } from 'react-router-dom';

export default function Chat(){

    const [user,setUser]=useState();
    const [gettingUser,setgettingUser]=useState(true);
    const [msg,setMsg]=useState();
    const [receivedMsg,setReceivedMsg]=useState([]);
    const [roomInfo,setRoomInfo]=useState();

    let params = useParams();
    let history = useHistory();

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            let user_obj={};
            user_obj.id=user.uid;
            user_obj.email=user.email;
            user_obj.photoURL=user.photoURL;
            user_obj.name=user.displayName;
            setgettingUser(false);
            setUser(user_obj);
          })
          getMsg();
          setRoomInfo(history.location.state.room);
    },[true])

    const handleChange=(event)=>{
        console.log(event);
        setMsg(event.target.value);
    }

    const onWriteMsgToDb = async () => {
        try {
            await firebase.database().ref(params.chatId).push({
              content: msg,
              timestamp: Date.now(),
              uid: user.id,
              email: user.email
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
              console.log(chats);
              setReceivedMsg(chats);
            });
          } catch (error) {
            console.log(msg);
        }
    }

    const onSendMsg=()=>{
        onWriteMsgToDb().finally(function (res){
            setMsg('');
        }).catch(function(error){
            console.log(error);
        })
    }

    return(
        <div>
            {gettingUser? <CircularProgress/>:
            <div style={{margin:20}}>
                <Card style={{marginBottom:20}}>
                    <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" src={roomInfo.image}>
                                R
                            </Avatar>
                            }
                            title={roomInfo.room_name}
                            subheader={roomInfo.room_des}
                        />
                </Card>
                <Card style={{padding:20,background:roomInfo.room_theme?roomInfo.room_theme:'#ffffff'}}>
                <div>
                    <div>
                        {receivedMsg.length?
                        receivedMsg.map((item)=>
                            <div>
                                <p className={item.uid==user.id?"my-msg-time":"other-msg-time"}>
                                    {item.email}
                                </p>
                                <p className={item.uid==user.id?"my-msg":"other-msg"}>
                                    {item.content}
                                </p>
                                <p className={item.uid==user.id?"my-msg-time":"other-msg-time"}>
                                    {new Date(item.timestamp).toTimeString()}
                                </p>
                            </div>
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
                                onKeyPress={(event=>{
                                    if(event.key=='Enter'){
                                        onSendMsg();
                                    }
                                })}
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