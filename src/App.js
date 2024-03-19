import React,{useEffect, useState} from 'react';
import './App.css';
function App() {
  const [city,setCity]=useState(null);
  const [flag,setFlag]=useState(false);
  const [search ,setSearch]=useState('Mumbai');
  useEffect(()=>{
    const fetchapi=async()=>{
      const url=`https://api.weatherapi.com/v1/forecast.json?key=27529e13081a4b7a8d384425231307&q=${search}&aqi=yes`
    try{const response =await fetch(url) 
      console.log(response)
      const resjson=await response.json();
       console.log(resjson);
      if(response.status===200)
      setCity(resjson)
      else
      setCity(null) }
      catch(error){
        console.log("Error is",error)
        alert("You have lost your internet connectivity")
      }   
    };
    fetchapi()
  },[search,flag])
  return (
    <div className="App" >
        <h1>Weather App</h1>
        <input type='search' placeholder='Enter Your city name' value={search} onChange={(event)=>{setSearch(event.target.value)}} />
        <div className='card'>
         { !city ?(<p>No City found</p>):(<div>
            <h2>{city.location.name}</h2>
            <h1> <img src={city.current.condition.icon} alt="Weather data by WeatherAPI.com" border="0"/>{city.current.temp_c}<sup>o</sup>C</h1>
            <p>Max.={city.forecast.forecastday[0].day.maxtemp_c}|Min.={city.forecast.forecastday[0].day.mintemp_c}</p>
        <p>{city.location.region},{city.location.country}</p>
          {!city.forecast.forecastday[0].astro.is_moon_up 
             ?(<p>SunRise={city.forecast.forecastday[0].astro.sunrise} , SunSet={city.forecast.forecastday[0].astro.sunset}</p>):(<p>MoonRise={city.forecast.forecastday[0].astro.moonrise} , MoonSet={city.forecast.forecastday[0].astro.moonset}</p>)}
           <h3>Feels_like={city.current.feelslike_c} </h3>
           <h3>Wind_direction={city.current.wind_dir}</h3>
           <h3>Wind_speed={city.current.wind_kph}Kph</h3>
           <div className='forecast'>

            <button onClick={()=>flag===false?setFlag(true):setFlag(false)}>Click here for Today's 24 Hours forecast</button>
          {flag?(<p>{
            [...Array(24)].map((x,i)=>
            ( 
             <div><img src={city.forecast.forecastday[0].hour[i].condition.icon} alt="Weather data by WeatherAPI.com" border="0"/> {city.forecast.forecastday[0].hour[i].chance_of_rain}%
             <h4>{city.forecast.forecastday[0].hour[i].condition.text} {city.forecast.forecastday[0].hour[i].time}</h4>
             </div>
            )
          )}</p>):(<h1></h1>)}
            </div>
           </div>)}
        </div>
    </div>
  );
}

export default App;
