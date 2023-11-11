import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import axios from "axios";
import WeatherCard from "./Components/WeatherCard";

const App = () => {
  // Local State Variable
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [currentWeatherData,  setCurrentWeatherData] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
//    console.log('useEffect is running')
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
        console.log("position: ", position)

        const response = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=90ad317d93ca4e8bb4f200019230309&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`
          );
          console.log("responseData: ", response.data);

          setCurrentWeatherData(response.data)
        
});
  } else {
    alert('Geolocation is not supported by this browser.')
  }


  }, [])

  let getWeather = async (event) => {
    event.preventDefault();
    // console.log("getWeather is running")
    // let cityName = document.querySelector('.cityName').value;
    // console.log(`Getting Weather of: ${cityName}`)
    console.log(`Getting Weather of: ${inputRef.current.value}`);

    //WEATHER API CALL
    try {
      setLoading(true);
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=90ad317d93ca4e8bb4f200019230309&q=${inputRef.current.value}&aqi=no`
      );
      console.log("responseData: ", response.data);
      setLoading(false);
      //   data.push(response.data); //[karachi, lahore, denver]
      // setData(data);

      //ONE METHODE
      let clone = [response.data, ...data];
      console.log("clone:", clone);
      // clone.push(response.data)
      setData(clone);
      event.target.reset();

      //TWO METHODE
      // setData((prev)=>{
      //     return [response.data, ...prev]
      // })
    } catch (e) {
      setLoading(false);
      console.log("Error: ", e);
    }
  };

  //   let changeVal = (event) => {
  //     setCityName(event.target.value);
  //     console.log("changeVal: ", event.target.value);
  //   }

  return (
    <div className="weather-app">
      <h1
        style={{
          textAlign: "center",
          fontWeight: "800",
          textDecoration: "underLine",
        }}
      >
        REACT WEATHER APP
      </h1>

      <form className="form" onSubmit={getWeather}>
        {/* <label htmlFor="cityName" className="label">City Name: </label> */}
        <input
          type="text"
          className="cityName"
          required
          placeholder="Enter Your City Name"
          maxLength={20}
          minLength={2}
          //   onChange={changeVal}
          ref={inputRef}
        ></input>
        {/* <button type="submit" className="btn">
          Get Weather
        </button> */}
        <Button
          type="submit"
          variant="contained"
          sx={{ marginLeft: "0.5em", width: "140px", height: "50px" }}
        >
          Get Weather
        </Button>
      </form>
      {/* <hr/> */}
      <br />

      {isloading ? <div className="loader"></div> : null}

      {data.length
        ? data.map((eachWeatherData, index) => (
            <WeatherCard key={index} data={eachWeatherData} />
          ))
        : null}


     {/* {currentWeatherData && <WeatherCard data={currentWeatherData} />} */}
     {(currentWeatherData) ? <WeatherCard data={currentWeatherData} /> : null }


    </div>
  );
};

export default App;

