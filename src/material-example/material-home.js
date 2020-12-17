import React, {Component} from 'react';
import Header from "./header";
import FormExample from "./form-example";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StartIcon from '@material-ui/icons/AccessAlarm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { TrainRounded } from '@material-ui/icons';

class MaterialHome extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            openMenu:false,
            anchor:''
        }
    }

    handleClose=()=>{
        this.setState({open:false,openMenu:false})
    }

    openMenu=(event)=>{
        this.setState({
            anchor:event.currentTarget,
            openMenu:true
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div style={{margin:'20px'}}>
                <FormExample/>
                </div>
                <Button variant="outlined" color="secondary"
                    onClick={this.openMenu}
                    startIcon={<StartIcon/>}>
                    Primary
                </Button>
                <Button variant="outlined" color="secondary"
                    onClick={()=>this.setState({open:true})}
                    endIcon={<StartIcon/>}>
                    Open Dialogue
                </Button>
                <ButtonGroup color="primary"  variant="contained" aria-label="outlined primary button group">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchor}
                    open={this.state.openMenu}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default MaterialHome;