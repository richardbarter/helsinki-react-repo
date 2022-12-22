import React from 'react'
import Country from './Country'
import CountryData from './CountryData'

const Countries = ({countries, filter, handleShowCountryClick}) => {
    console.log('countries test', countries);
    if(filter === ''){
        return(<div></div>)
    }
    if(countries.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if(countries.length === 1){
        console.log('countries is test', countries[0]);
        return(
            <div>
                <CountryData country={countries[0]} />
            </div>
        )
    }
    //change the key to country.fifa or w/e it is
    return(
        <div>
            {countries.map((country, i) => 
                
                <Country key={i} country={country} handleShowCountryClick={handleShowCountryClick} />
            )}
        </div>
    )
   
}

export default Countries