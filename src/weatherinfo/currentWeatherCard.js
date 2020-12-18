import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

class CurrentWeatherCard extends Component {
    render() {
        let weather=this.props.data;
        return(
            <div>
                <Card>
                    <div style={{color:"#eb6e4b",fontSize:16}}>
                        {new Date().toDateString()}
                    </div>
                    <div style={{fontSize:20,fontWeight:900,marginTop:8}}>
                        {weather.name},{weather.sys.country}
                    </div>
                    <div>
                        SunRise: {new Date(weather.sys.sunrise).toLocaleString()}
                    </div>
                    <div>
                        SunSet: {new Date(weather.sys.sunset).toLocaleString()}
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs="3" sm="2">
                            <div>Temperature</div>
                            <div>{weather.main.temp}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="3" sm="2">
                            <div>Min Temperature</div>
                            <div>{weather.main.temp_min}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="3" sm="2">
                            <div>Max Temperature</div>
                            <div>{weather.main.temp_max}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="3" sm="2">
                            <div>Pressure</div>
                            <div>{weather.main.pressure}</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs="3" sm="2">
                            <div>Humidity</div>
                            <div>{weather.main.humidity}</div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        )
    }
    
}

export default CurrentWeatherCard;