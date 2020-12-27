import { Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import { REGISTER_USER } from './config';
import { getUserList } from './user-management';
import { useHistory } from 'react-router-dom';

export default function UserList(props){

    const [userList,setUserList] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [open,setOpen] = useState(false);
    const [room_name,setRoomName] = useState();

    let history = useHistory();

    const handleClose = () => {
        setOpen(false);
      };

    const handleChange=(event)=>{
        setRoomName(event.target.value);
    }

    const createRoom=()=>{
        let room={};
        room.name=room_name; 
        room.id=props.uid+'_'+new Date().getTime();
        // createChatRoom().then(function(){
        //     alert('room created')
        // })
        console.log(room);
    }

    useEffect(()=>{
        getUserList().then(function (res){
            setUserList(res)
            setIsLoading(false)
        })
    },[true])

    return <div style={{margin: '20px 0px'}}>
        {isLoading? <p>Please Wait, Loading users...</p>:
        
        <Card style={{padding: 20}}>
            <Button style={{float:'right'}} onClick={()=>setOpen(true)}>
                Create Chat Room
            </Button>
            <h3>Available Users</h3>
            <List>
                {userList.map((item)=>
                    <ListItem style={{cursor:'pointer'}}  
                    onClick={()=>history.push('/chat/'+item.data().fbid)}>
                        <ListItemAvatar>
                        <Avatar src={item.data().image}>
                            CA
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.data().name} secondary={item.data().email} />
                    </ListItem>
                )}
            </List>
        </Card>
        }
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createRoom} color="primary">
            Create Room
          </Button>
        </DialogActions>
      </Dialog>
   </div>
}