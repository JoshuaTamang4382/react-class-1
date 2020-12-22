import React, { useState,useEffect } from 'react';

export default function EffectHookExample() {

    const[count,setCount]=useState(0);
    const[isCalled,setIsCalled]=useState(false);
    const[isCalledAgain,setIsCalledAgain]=useState(false);

    useEffect( ()=>{
        console.log('This is use effect hook')
    },[isCalled,isCalledAgain]);

    return (
        <div>This is example of the effect hook.{count}
            <button onClick={()=>setCount(count+1)}>Click</button>
            <button onClick={()=>setIsCalled(true)}>Call Effect</button>
            <button onClick={()=>setIsCalledAgain(true)}>Call Effect Again</button>
        </div>
    )
}