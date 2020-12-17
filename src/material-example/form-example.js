import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import "./material-css.css";
import Grid from '@material-ui/core/Grid';

class FormExample extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"Joshua"
        }
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.id]:[event.target.value]
        })
    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    {[0, 1, 2].map((value) => (
                        <Grid key={value} item xs="6" sm="4">
                            <TextField 
                                id="name" 
                                label="Enter Name" 
                                color="secondary"
                                variant="filled"
                                helperText="Please Enter valid name"
                                placeholder="Enter Full Name"
                                value={this.state.name}
                                error={false}
                                disabled={false}
                                onChange={this.handleChange}
                                fullWidth={true}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        ) ;   
    }
}

export default FormExample;

