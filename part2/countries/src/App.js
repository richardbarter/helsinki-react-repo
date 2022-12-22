import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true)
  //const [newExactFilter, setNewExactFilter] = useState('')
  //const [showExact, setShowExact] = useState(false)
 
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    //setShowExact(false)
    setNewFilter(event.target.value)
    if(event.target.value !== ''){
      setShowAll(false)
    }else{
      setShowAll(true)
    }
  }
 
  const handleShowCountryClick = ({country}) => {
    setNewFilter(country.name.common)
  } 

  const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  // let countriesToShow = showAll
  //   ? countries
  //   : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  // if(showExact){

  //   countriesToShow = countries.filter(country => country.name.common.toLowerCase() === newExactFilter.toLowerCase())

  // }
 
  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} filter={newFilter} handleShowCountryClick={handleShowCountryClick} />
      {/* {countriesToShow.map((country, i) =>
        <Country key={i} country={country} /> 
      )} */}
     
    </div>
  )
}




  // console.log('before if show exact is', showExact);
  // if(showExact){
  //   const countriesToShow = countries.filter(country => country.name.common.toLowerCase() === newExactFilter.toLowerCase())

  // }else{
  //   console.log('in else to set countriesToShow');
  //   const countriesToShow = showAll
  //   ? countries
  //   : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  //   console.log('countries to showare test', countries);
  // }

  // const countriesToShow = showAll
  //   ? countries
  //   : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  //   console.log('countries to showare test', countries);

export default App;
