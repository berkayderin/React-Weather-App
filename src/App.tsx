import './App.css'

import { useEffect, useState } from 'react'

import axios from 'axios'

function App() {
	const [weatherData, setWeatherData] = useState(null)
	const [location, setLocation] = useState('')

	const fetchData = async () => {
		if (!location) return

		try {
			const response = await axios.get(
				`http://api.weatherapi.com/v1/forecast.json?key=${
					import.meta.env.VITE_WEATHER_API
				}&q=${location}&days=4&aqi=yes&alerts=yes`
			)
			setWeatherData(response.data)
			console.log('data:', response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleLocationChange = (e) => {
		setLocation(e.target.value)
	}

	useEffect(() => {
		fetchData()
	}, [location])

	return (
		<div className="container">
			{/* header  */}
			<div className="header">
				<h1>Welcome to TypeWeather</h1>
				<p>Choose a location to see the weather forecast</p>
			</div>
			{/* search input */}
			<div className="search">
				<input type="text" placeholder="Search location" value={location} onChange={handleLocationChange} />
			</div>
			{/* weather data */}
			<div className="weather">
				{weatherData && (
					<div>
						{weatherData.forecast.forecastday.map((day, index) => (
							// weather card component
							<div>
								<div>
									<h3>{weatherData.location.name}</h3>
									<p>{day.date}</p>
								</div>
								<div>
									<img src={day.day.condition.icon} alt={day.day.condition.text} />
								</div>
								<div>
									<div>
										{day.day.mintemp_c}°C / {day.day.maxtemp_c}°C
									</div>
									<div>{day.day.condition.text}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default App
