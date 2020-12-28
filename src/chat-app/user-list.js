import { Avatar, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import { REGISTER_USER } from './config';
import { createChatRoom, getChatRoomList, getUserList } from './user-management';
import { useHistory } from 'react-router-dom';

export default function UserList(props){

    const [userList,setUserList] = useState();
    const [chatRoomList,setChatRoomList] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [open,setOpen] = useState(false);
    const [error,setError] = useState(false);
    const [creatingRoom,setCreatingRoom] = useState(false);
    const [room_name,setRoomName] = useState();
    const [room_des,setRoomDes] = useState();
    const [room_image,setRoomImage] = useState();

    let history = useHistory();

    const handleClose = () => {
        setOpen(false);
        setError(false);
      };

    const handleChange=(event)=>{
      if(event.target.id==='room_name') setRoomName(event.target.value);
      else if(event.target.id==='room_des') setRoomDes(event.target.value);
      else setRoomImage(event.target.value);
    }

    const createRoom=()=>{
        setCreatingRoom(true);
        let room={};
        room.name=room_name; 
        room.id=props.uid+'_'+new Date().getTime();
        room.room_des=room_des; 
        room.room_image=room_image; 
        createChatRoom(room).then(function(){
            alert('room created')
            setCreatingRoom(false);
            setOpen(false);
            history.push('chat/'+room.id);
        }).catch(function (error){
            setCreatingRoom(false);
            setError(true);
        })
        console.log(room);
    }

    useEffect(()=>{
        getChatRoomList().then(function (res){
            setChatRoomList(res)
            setIsLoading(false)
        })
    },[true])

    return <div style={{margin: '20px 0px'}}>
        {isLoading? <p>Please Wait, Loading users...</p>:
        
        <Card style={{padding: 20}}>
            <Button style={{float:'right'}} onClick={()=>setOpen(true)}>
                Create Chat Room
            </Button>
            <h3>Available Chats</h3>
            <List>
                {chatRoomList.map((item)=>
                    <ListItem style={{cursor:'pointer'}}  
                    onClick={()=>history.push('/chat/'+item.data().room_id,{room:item.data()})}>
                        <ListItemAvatar>
                        <Avatar src={item.data().room_image}>
                            CA
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.data().room_name} secondary={item.data().room_des} />
                    </ListItem>
                )}
            </List>
        </Card>
        }
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        {creatingRoom? <CircularProgress/>:
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={handleChange}
            id="room_name"
            label="Enter Chat Room Name"
            type="text"
            value={room_name}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={handleChange}
            id="room_des"
            label="Enter Chat Room Description"
            type="text"
            value={room_des}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={handleChange}
            id="room_image"
            label="Enter Chat Room Image"
            type="text"
            value={room_image}
            fullWidth
          />
        </DialogContent>}
        {creatingRoom? '':
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createRoom} color="primary">
            Create Room
          </Button>
        </DialogActions>}
      </Dialog>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            Unable to create room
        </Alert>
      </Snackbar>
   </div>
}