import { CircularProgress, TextField } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { CenterFocusStrong, FlashOff } from "@material-ui/icons";
import React, { Component } from "react";
import CurrentWeatherCard from "./currentWeatherCard";
import {WeatherAPI} from './weatherApi';
import Button from '@material-ui/core/Button';

class WeatherHome extends Component {
    
constructor(props){
    super(props);
    this.state={
        city : "Kathmandu",
        weatherData:{},
        isLoading:true
    }
}

    componentDidMount(){
        this.getWeatherData();
        
    }

    handleChange=(e)=>{
        let cityname = e.target.value;
        this.setState({
            city: cityname
        })
    }

    getWeatherData=()=>{
        let self=this;
        WeatherAPI.getCurrentWeatherData(this.state.city).then(function (res){
            console.log(res.data);
            self.setState({
                weatherData:res.data,
                isLoading:false
            })
        }).catch(function (error){
            console.log(error);
        })
    }

    render() {
        return(
            <div style={{maxWidth:800,margin:'30px auto',background:'#f5f5f5',padding:20,marginBottom:20}}>
                <div style={{display:"flex",width:600}}>
                    <div style={{width:300,paddingRight:20}}>
                            <TextField type="text" onChange={(e)=>this.handleChange(e)}
                            style={{width:'100%',marginBottom:15}}
                            id="standard-basic" label="Enter City Name"/>
                
                    </div>
                    <div>
                        <Button type="button" onClick={this.getWeatherData}
                        variant="contained" color="primary">
                        Search
                        </Button>
                    </div>
                </div>
                {this.state.isLoading?<CircularProgress/> :
                    <div>
                        <CurrentWeatherCard data={this.state.weatherData}/>
                    </div>
                }
                    

            </div>
        );
    }
}

export default WeatherHome;