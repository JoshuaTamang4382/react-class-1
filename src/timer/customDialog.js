import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export default function CustomDialog(props) {

    const[open,setOpen]=useState(false);

    function handleClose() {
        props.onCloseDialog()
    }

    useEffect(()=>{
        setOpen(props.openDialog)
    },[props.openDialog])

    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Alert!!!</DialogTitle>
                <DialogContent>
                    {props.dialogContent}
                </DialogContent>
            </Dialog>
        </div>
    )
}