import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';


//api call api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const API_key = '3803926779f22fa59b3b7d12f0bf4e42';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city:undefined,
      country:undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmoshphere: "wi-fog",
      clear: "wi-day-sunny",
      clouds: "wi-day-fog"
    };
  }

  calCelcius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_weatherIcon(icons, rangeId) {
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 532:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 621:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmoshphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.clouds});
        break;
        default:
          this.setState({icon: this.weatherIcon.clouds});
    }
  }

  getWeather = async(e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: `${response.name},${response.sys.country}`,
      celsius: this.calCelcius(response.main.temp),
      temp_max: this.calCelcius(response.main.temp_max),
      temp_min: this.calCelcius(response.main.temp_min),
      description: response.weather[0].description,
      error: false
    });

    this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
    }else{
      this.setState({error:true});
    }

  };


  render(){
    return (
      <div className="App">
        <Form loadweather ={this.getWeather} error={this.state.error} />
        <Weather city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
    </div>
    )
  };
}






export default App;
