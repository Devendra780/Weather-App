import React from 'react';
import './App.css';
import Axios from 'axios';
import DisplayWeather from './components/DisplayWeather.js';


class App extends React.Component{
  state = {
    coords:{
      latitude:45,
      longitude:60
    },
    data:{}
  }
  componentDidMount(){
    // Get Device Location
    if(navigator.geolocation)
    {
      
      navigator.geolocation.getCurrentPosition((position) =>{
        let newCoords = {
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        }
        this.setState({coords:newCoords});
        Axios.get(`http://api.weatherstack.com/current?
        access_key = 20b8c66a8a402f27b63129d9963e&query = ${this.state.coords.latitude},
        ${this.state.coords.longitude}`).then(res =>{
          let weatherData = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState({data:weatherData});

      })
    })
      }
    else
    {
        console.log("not supported");
    }
  }
  render() {
    return(
     <div className="App">

     </div>
    
    )
  }
}

export default App;
