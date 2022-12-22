import React from 'react'
import CountryFlag from './CountryFlag'
import CountryWeather from './CountryWeather'


const CountryData = ({country}) => {
    // console.log('country', country);
    // console.log('languesage are', country.languages);
    
    
    const languages = Object.values(country.languages)
    return(
        <>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
               {languages.map((language, i) => 
                
                 <li key={i}>{language}</li>
               )} 
            </ul>
            <CountryFlag flag={country.flags.svg} />
            <CountryWeather country={country} />
        </>
    )
}

export default CountryData