import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css";

function Home() {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [feelsLike, setFeelsLike] = useState(0);
    const [humidity, setHumidity] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [description, setDescription] = useState('');
    const [pressure, setPressure] = useState('');
    const [visibility, setVisibility] = useState('');
    const [cloudiness, setCloudiness] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [message, setMessage] = useState('');
    const [showWeather, setShowWeather] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('bg-image.jpg');
    const [loading, setLoading] = useState(false);
    const [fade, setFade] = useState(false);

    async function loadWeatherInfo() {
        setLoading(true);
        setFade(false);
        try {
            // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16691c34fcdf56070185da6b2b944c91`);


            setTemperature((response.data.main.temp - 273).toFixed(2));
            setFeelsLike((response.data.main.feels_like - 273).toFixed(2));
            setHumidity(response.data.main.humidity);
            setWindSpeed(response.data.wind.speed);
            setDescription(response.data.weather[0].description);
            setPressure(response.data.main.pressure);
            setVisibility(response.data.visibility);
            setCloudiness(response.data.clouds.all);
            setSunrise(new Date(response.data.sys.sunrise * 1000).toLocaleTimeString());
            setSunset(new Date(response.data.sys.sunset * 1000).toLocaleTimeString());
            setMessage('');
            setTimeout(() => {
                setShowWeather(true);
                setBodyBackgroundImage(response.data.weather[0].description);
                setFade(true);
            }, 500);
        } catch (err) {
            setTemperature(0);
            setFeelsLike(0);
            setHumidity('');
            setWindSpeed('');
            setDescription('');
            setPressure('');
            setVisibility('');
            setCloudiness('');
            setSunrise('');
            setSunset('');
            setMessage('City Not Found ?');
            setShowWeather(false);
            setBackgroundImage('bg-image.jpg');
        } finally {
            setTimeout(() => setLoading(false), 1500);
        }
    }

    const handleInputChange = (e) => {
        setCity(e.target.value);
        if (e.target.value === '') {
            setShowWeather(false);
            setMessage('');
            setBackgroundImage('bg-image.jpg');
        }
    };

    const getBackgroundImage = (description) => {
        if (description.includes('thunderstorm')) return 'thunderstorm.jpg';
        if (description.includes('drizzle')) return 'drizzle.jpg';
        if (description.includes('rain')) return 'rain.jpg';
        if (description.includes('snow')) return 'snow.jpg';
        if (description.includes('mist')) return 'mist.jpg';
        if (description.includes('smoke')) return 'smoke.jpg';
        if (description.includes('haze')) return 'haze.jpg';
        if (description.includes('fog')) return 'fog.jpg';
        if (description.includes('clear')) return 'clear.jpg';
        if (description.includes('few clouds')) return 'few.jpg'; // Updated check
        if (description.includes('scattered clouds')) return 'clouds.jpg';
        if (description.includes('broken clouds')) return 'clouds.jpg';
        if (description.includes('overcast clouds')) return 'clouds.jpg';
        if (description.includes('cloud')) return 'cloud.jpg'; // Moved to the end
        return 'bg-image.jpg'; // Default image
    };

    const setBodyBackgroundImage = (description) => {
        const imageName = getBackgroundImage(description);
        setBackgroundImage(imageName);
    };

    return (
        <div className="app-container"
            style={{
                backgroundImage: `url('./assets/${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
                margin: 0,
                padding: 0,
            }}>
            <h1 className='app-title'>Weather Forecast</h1>

            <div className='search-container'>
                <input
                    type="text"
                    className='search-bar'
                    placeholder="Search Location.."
                    value={city}
                    onChange={handleInputChange}
                />
                <button className="search-button" onClick={loadWeatherInfo}>
                    Search
                </button>
            </div>
            <p className='message-alert'>{message}</p>

            {loading && <div className="loader">Loading...</div>} {/* ✅ LOADER */}

            {showWeather && !loading && (
                <>
                    <div className='weather-info'>
                        <h3 className='city-name'>{city} {"  "} </h3>
                        <span className='city-temp'> {temperature} °C</span>
                    </div>
                    <div className='weather-data'>
                        <div className='weather-box'>
                            <i className="fas fa-thermometer-half"></i>
                            <p className='city-feels-like'>Feels Like: {feelsLike} °C</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-tint"></i>
                            <p className='city-humidity'>Humidity: {humidity} %</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-wind"></i>
                            <p className='city-wind'>Wind Speed: {windSpeed} m/s</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-cloud"></i>
                            <p className='city-description'>Description: {description}</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-tachometer-alt"></i>
                            <p className='city-pressure'>Pressure: {pressure} hPa</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-eye"></i>
                            <p className='city-visibility'>Visibility: {visibility} m</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-cloud-sun"></i>
                            <p className='city-cloudiness'>Cloudiness: {cloudiness} %</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-sun"></i>
                            <p className='city-sunrise'>Sunrise: {sunrise}</p>
                        </div>
                        <div className='weather-box'>
                            <i className="fas fa-moon"></i>
                            <p className='city-sunset'>Sunset: {sunset}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
