import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Home.css"

function Home() {

    const [city, setCity] = useState('')
    const [temprature, setTemprature] = useState(0)
    const [humidity, setHumidity] = useState('')
    const [message, setMessage] = useState('')

    async function loadWeatherInfo() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16691c34fcdf56070185da6b2b944c91`)

            setTemprature((response.data.main.temp - 273).toFixed(2))
            setHumidity(response.data.main.humidity);
            setMessage('')
        }
        catch (err) {
            setTemprature(0)
            setMessage('City Not Found ?')
        }
    }


    useEffect(() => {
        loadWeatherInfo()
    }, [{ city }])

    return (
        <div>
            <h1 className='app-title'>Weather Forecast</h1>

            <input
                type="text"
                className='search-bar'
                placeholder="Search Location.."
                value={city}
                onChange={(e) => {
                    setCity(e.target.value)
                }}
            />
            <p className='message-alert'>{message}</p>

            <div className='weather-info'>
                <h3 className='city-name'>{city} {"  "} </h3>
                <span className='city-temp'> {temprature} °C</span>

            </div>


        </div>
    )
}

export default Home