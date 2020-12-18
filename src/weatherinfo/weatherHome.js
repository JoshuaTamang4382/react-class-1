import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import Header from "../material-example/header";
import CurrentWeatherCard from "./currentWeatherCard";
import {WeatherAPI} from './weatherApi';

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

    getWeatherData=()=>{
        let self=this;
        WeatherAPI.getCurrentWeatherData('Kathmandu').then(function (res){
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
            <div>
                <Header/>
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