import React from 'react';
import { useHistory } from 'react-router-dom';

export default function MySecondHook(props) {

    return(
        <div>This is second Hook
            <img style={{width:60}} src={props.imageUrl}></img>
            <div>{props.name}</div>
            <img src={props.localImage}></img>
        </div>
    )
}