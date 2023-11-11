import React from 'react'
import './Weather.css'

const WeatherCard = ({data}) => {
  return (
    <div className=''>
         <div className="weather-card">
          {/* tz_id: {data?.location?.tz_id} */}
          {/* <br /> */}
         Country Name: {data?.location?.country}
          <br />
         City Name: {data?.location?.name}
          <br />
          {/* Region: {data?.location?.region} */}
          {/* <br /> */}
         <div className='temp'>{data?.current?.temp_c}°C </div>
         <img src={data?.current.condition.icon} alt='img' className='weather-img'></img>
          <br />
         {data?.current?.condition?.text}
          <br />
          Humidity: {data?.current?.humidity}
          <br/>
         <div>Wind: {data?.current?.wind_kph} KPH </div>
          {/* <br /> */}
          {/* Location Time: {data?.location?.localtime} */}
        </div>
    </div>
  )
}

export default WeatherCard

