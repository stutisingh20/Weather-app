import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from "./Weathercard"

const Temp = () => {

  const[searchValue, setsearchValue]=useState("Pune");
  const [tempInfo, settempInfo]= useState({})

  const getWeatherInfo= async()=>{
     try{
      // let url= api.openweathermap.org/data/2.5/weather?q=$
      // appid=&6a2b1dcd45e4e94fca0eb2b8582f07c6

      let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=6a2b1dcd45e4e94fca0eb2b8582f07c6`;
      const res= await fetch(url)
      const data= await res.json()
    

      const {temp,humidity, pressure}= data.main;
      const {main:weathermood}= data.weather[0];
      const {name}=data;
      const{speed}=data.wind;
      const{country,sunset}=data.sys;

      const myWeatherInfo={
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      }
      settempInfo(myWeatherInfo);

     }catch(error){
       console.log(error)
     }
  }

  useEffect(()=>{getWeatherInfo()},[])

  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input
                type='search'
                placeholder='search...'
                autoFocus
                className='searchTerm'
                value={searchValue }
                onChange={(e)=>setsearchValue(e.target.value)}
            />
            <button className='searchButton' type='button' onClick={getWeatherInfo}>search</button>
        </div>

        
      </div>

      <Weathercard tempInfo={tempInfo}/>
      
    </>
  )
}

export default Temp
