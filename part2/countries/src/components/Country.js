import React from 'react'



const Country = ({country, handleShowCountryClick}) => {
    //console.log('country in thing is', country);
    
    return(
        <>
            <div>{country.name.common} <button  onClick={() => handleShowCountryClick({country})}>show</button></div>
            
        </>
    )
}

export default Country