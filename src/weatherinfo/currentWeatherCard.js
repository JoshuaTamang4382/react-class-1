import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

class CurrentWeatherCard extends Component {
    render() {
        let weather=this.props.data;
        return(
            <div>
                <Card style={{padding:'20px'}}>
                    <div style={{color:"#eb6e4b"}}>
                        {new Date().toDateString()}
                    </div>
                    <div style={{fontSize:20,fontWeight:900,marginTop:8}}>
                        {weather.name},{weather.sys.country}
                    </div>
                    <div style={{color:'brown',fontSize:20,textAlign:'center'}}>
                        SunRise: {new Date(weather.sys.sunrise).toLocaleString()}
                    </div>
                    <div style={{color:'purple',fontSize:20,textAlign:'center'}}>
                        SunSet: {new Date(weather.sys.sunset).toLocaleString()}
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs="6" sm="4">
                            <div style={{color:'#red',fontSize:20,textAlign:'center'}}>Temperature</div>
                            <div style={{fontSize:18,textAlign:'center'}}>{weather.main.temp}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="6" sm="4">
                            <div style={{color:'orange',fontSize:20,textAlign:'center'}}>Min Temperature</div>
                            <div style={{fontSize:18,textAlign:'center'}}>{weather.main.temp_min}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="6" sm="4">
                            <div style={{color:'pink',fontSize:20,textAlign:'center'}}>Max Temperature</div>
                            <div style={{fontSize:18,textAlign:'center'}}>{weather.main.temp_max}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="6" sm="4">
                            <div style={{color:'green',fontSize:20,textAlign:'center'}}>Pressure</div>
                            <div style={{fontSize:18,textAlign:'center'}}>{weather.main.pressure}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="6" sm="4">
                            <div style={{color:'blue',fontSize:20,textAlign:'center'}}>Humidity</div>
                            <div style={{fontSize:18,textAlign:'center'}}>{weather.main.humidity}</div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        )
    }
    
}

export default CurrentWeatherCard;