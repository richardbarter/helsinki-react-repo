import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeather = ({country}) => {

	const api_key = process.env.REACT_APP_API_KEY
	const[weather, setWeather] = useState([]);
	//const[weatherIcon, setWeatherIcon] = useState([])
	useEffect(() => {
		
		console.log('effect')
		axios
		.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
		.then(response => {
			console.log('promise fulfilled get weather', response);
			//instead of having 1 const weather that holds everything for weather response data. Have one that is set to response.data.weather
			//have another that is set to response.data.main etc. Or at least for any that have a lot of nested arrays. Concept is that we want 
			//to keep 
			setWeather(response.data)
			console.log(response.data.weather[0].icon);

		})
	}, [])
	//look into how to hanle the first render for state that has not yet been assigned.
	//also look into how to process calling an axios that relies on data from a previous axios. 
		
	// useEffect(() => {
		//Initially thought needed to make another axios to get data based on result of previous axios data
		//Different realize url itself is the image source.
		//but, what if I did need to get more data based on original useEffect? is this best way to do it? check if the conditional variable is defined in if statement?
	// 	console.log('in use effect weather icon');
	// 	if(weather.weather !== undefined && weather.weather !== null){
	// 		console.log('weather icon is:', weather.weather.icon);
	// 		axios
	// 		.get(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
	// 		.then(response => {
	// 			console.log('promise fulfilled get weather icon', response);
	// 			setWeatherIcon(response.data)
				
	// 		})
	// 	}
	// }, [weather])

	
	return(
	<>
		<h2>Weather in {country.capital}</h2>
		<div>temperature {weather.main?.temp} Celcius</div>

		{weather.weather ? (
		<div><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/></div>
		): ('')}
		
		<div>wind {weather.wind?.speed} m/s</div>
		
	</>
	)



}

export default CountryWeather