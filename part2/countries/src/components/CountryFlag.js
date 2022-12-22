import React from 'react'

const CountryFlag = ({flag}) => {
    //console.log('country', country);
    return(
        <>
            <img style={{width: 300}} src={flag}/>
        </>
    )
}

export default CountryFlag