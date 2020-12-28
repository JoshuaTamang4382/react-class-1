import firebase from "firebase";
import { CHAT_ROOM, REGISTER_USER } from "./config";

export async function registerUser(userInfo){
    console.log(userInfo);
    await firebase.firestore().collection(REGISTER_USER).add({
        name : userInfo.displayName,
        image : userInfo.photoURL,
        email : userInfo.email,
        fbid : userInfo.uid,
    }).then(function (response){
        // history.push('/user-list');
    }).catch(function(error){
    })
    
}

export async function getUserList() {
    const snapshot = await firebase.firestore().collection(REGISTER_USER).get();
        return snapshot.docs.map(doc => doc);
}

export async function getChatRoomList() {
    const snapshot = await firebase.firestore().collection(CHAT_ROOM).get();
        return snapshot.docs.map(doc => doc);
}

export async function createChatRoom(chat_room){
    return new Promise(function (resolve,reject){
        await firebase.firestore().collection(CHAT_ROOM).add({
            room_name:chat_room.name,
            room_id:chat_room.id,
            room_des:chat_room.room_des,
            room_image:chat_room.room_image
        }).then(function (response){
            resolve(response)
        }).catch(function(error){
            reject(error)
        })
    })
}