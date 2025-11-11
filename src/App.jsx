import React, { useState, useEffect } from 'react'
import { Search, MapPin, Wind, Droplets, Gauge, Sun, Moon, Cloud, CloudRain, CloudSnow, Eye, Navigation } from 'lucide-react'
import './index.css'

// Mock weather data untuk demo
const MOCK_WEATHER_DATA = {
  'jakarta': {
    location: {
      name: 'Jakarta',
      country: 'ID',
      lat: -6.2088,
      lon: 106.8456
    },
    current: {
      temp_c: 32,
      temp_f: 89.6,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003
      },
      wind_kph: 15.2,
      wind_mph: 9.4,
      humidity: 78,
      pressure_mb: 1010,
      pressure_in: 29.83,
      vis_km: 10,
      vis_miles: 6,
      feelslike_c: 38,
      feelslike_f: 100.4,
      uv: 7,
      air_quality: {
        pm2_5: 12.3,
        pm10: 23.1
      }
    },
    forecast: {
      forecastday: [
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 33,
            maxtemp_f: 91.4,
            mintemp_c: 26,
            mintemp_f: 78.8,
            condition: {
              text: 'Patchy rain possible',
              icon: '//cdn.weatherapi.com/weather/64x64/day/176.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 34,
            maxtemp_f: 93.2,
            mintemp_c: 27,
            mintemp_f: 80.6,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 32,
            maxtemp_f: 89.6,
            mintemp_c: 25,
            mintemp_f: 77,
            condition: {
              text: 'Thundery outbreaks possible',
              icon: '//cdn.weatherapi.com/weather/64x64/day/200.png'
            }
          }
        }
      ]
    }
  },
  'new york': {
    location: {
      name: 'New York',
      country: 'US',
      lat: 40.7128,
      lon: -74.0060
    },
    current: {
      temp_c: 12,
      temp_f: 53.6,
      condition: {
        text: 'Overcast',
        icon: '//cdn.weatherapi.com/weather/64x64/day/122.png',
        code: 1009
      },
      wind_kph: 22.5,
      wind_mph: 14,
      humidity: 65,
      pressure_mb: 1015,
      pressure_in: 29.97,
      vis_km: 16,
      vis_miles: 9,
      feelslike_c: 10,
      feelslike_f: 50,
      uv: 3,
      air_quality: {
        pm2_5: 8.7,
        pm10: 15.2
      }
    },
    forecast: {
      forecastday: [
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 14,
            maxtemp_f: 57.2,
            mintemp_c: 8,
            mintemp_f: 46.4,
            condition: {
              text: 'Light rain',
              icon: '//cdn.weatherapi.com/weather/64x64/day/296.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 16,
            maxtemp_f: 60.8,
            mintemp_c: 10,
            mintemp_f: 50,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 18,
            maxtemp_f: 64.4,
            mintemp_c: 12,
            mintemp_f: 53.6,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
            }
          }
        }
      ]
    }
  },
  'london': {
    location: {
      name: 'London',
      country: 'GB',
      lat: 51.5074,
      lon: -0.1278
    },
    current: {
      temp_c: 8,
      temp_f: 46.4,
      condition: {
        text: 'Light drizzle',
        icon: '//cdn.weatherapi.com/weather/64x64/day/266.png',
        code: 1153
      },
      wind_kph: 18.3,
      wind_mph: 11.4,
      humidity: 87,
      pressure_mb: 1008,
      pressure_in: 29.77,
      vis_km: 8,
      vis_miles: 4,
      feelslike_c: 5,
      feelslike_f: 41,
      uv: 1,
      air_quality: {
        pm2_5: 6.2,
        pm10: 11.8
      }
    },
    forecast: {
      forecastday: [
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 9,
            maxtemp_f: 48.2,
            mintemp_c: 4,
            mintemp_f: 39.2,
            condition: {
              text: 'Moderate rain',
              icon: '//cdn.weatherapi.com/weather/64x64/day/302.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 11,
            maxtemp_f: 51.8,
            mintemp_c: 6,
            mintemp_f: 42.8,
            condition: {
              text: 'Cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/119.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 13,
            maxtemp_f: 55.4,
            mintemp_c: 7,
            mintemp_f: 44.6,
            condition: {
              text: 'Sunny intervals',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
            }
          }
        }
      ]
    }
  },
  'tokyo': {
    location: {
      name: 'Tokyo',
      country: 'JP',
      lat: 35.6762,
      lon: 139.6503
    },
    current: {
      temp_c: 18,
      temp_f: 64.4,
      condition: {
        text: 'Clear',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        code: 1000
      },
      wind_kph: 12.8,
      wind_mph: 8,
      humidity: 55,
      pressure_mb: 1013,
      pressure_in: 29.91,
      vis_km: 20,
      vis_miles: 12,
      feelslike_c: 18,
      feelslike_f: 64.4,
      uv: 6,
      air_quality: {
        pm2_5: 9.1,
        pm10: 16.3
      }
    },
    forecast: {
      forecastday: [
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 20,
            maxtemp_f: 68,
            mintemp_c: 14,
            mintemp_f: 57.2,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 22,
            maxtemp_f: 71.6,
            mintemp_c: 16,
            mintemp_f: 60.8,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
            }
          }
        },
        {
          date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          day: {
            maxtemp_c: 19,
            maxtemp_f: 66.2,
            mintemp_c: 15,
            mintemp_f: 59,
            condition: {
              text: 'Light rain shower',
              icon: '//cdn.weatherapi.com/weather/64x64/day/353.png'
            }
          }
        }
      ]
    }
  }
}

const WeatherApp = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [unit, setUnit] = useState('metric')
  const [recentSearches, setRecentSearches] = useState([])

  // Weather icon mapping
  const getWeatherIcon = (conditionCode, isDay = true) => {
    const iconMap = {
      1000: <Sun className="w-8 h-8 text-amber-500" />, // Sunny
      1003: <Cloud className="w-8 h-8 text-slate-500" />, // Partly cloudy
      1006: <Cloud className="w-8 h-8 text-slate-600" />, // Cloudy
      1009: <Cloud className="w-8 h-8 text-slate-400" />, // Overcast
      1030: <Cloud className="w-8 h-8 text-slate-500" />, // Mist
      1063: <CloudRain className="w-8 h-8 text-blue-500" />, // Patchy rain
      1066: <CloudSnow className="w-8 h-8 text-cyan-400" />, // Patchy snow
      1069: <CloudSnow className="w-8 h-8 text-cyan-300" />, // Patchy sleet
      1072: <CloudRain className="w-8 h-8 text-blue-400" />, // Patchy freezing drizzle
      1087: <CloudRain className="w-8 h-8 text-purple-500" />, // Thundery outbreaks
      1114: <CloudSnow className="w-8 h-8 text-cyan-200" />, // Blowing snow
      1117: <CloudSnow className="w-8 h-8 text-cyan-100" />, // Blizzard
      1135: <Cloud className="w-8 h-8 text-slate-400" />, // Fog
      1147: <Cloud className="w-8 h-8 text-slate-300" />, // Freezing fog
      1150: <CloudRain className="w-8 h-8 text-blue-300" />, // Patchy light drizzle
      1153: <CloudRain className="w-8 h-8 text-blue-400" />, // Light drizzle
      1168: <CloudRain className="w-8 h-8 text-blue-500" />, // Freezing drizzle
      1171: <CloudRain className="w-8 h-8 text-blue-600" />, // Heavy freezing drizzle
      1180: <CloudRain className="w-8 h-8 text-blue-300" />, // Patchy light rain
      1183: <CloudRain className="w-8 h-8 text-blue-400" />, // Light rain
      1186: <CloudRain className="w-8 h-8 text-blue-500" />, // Moderate rain
      1189: <CloudRain className="w-8 h-8 text-blue-600" />, // Heavy rain
      1192: <CloudRain className="w-8 h-8 text-blue-700" />, // Torrential rain
      1195: <CloudRain className="w-8 h-8 text-blue-800" />, // Heavy rain
      1198: <CloudRain className="w-8 h-8 text-blue-300" />, // Light freezing rain
      1201: <CloudRain className="w-8 h-8 text-blue-500" />, // Moderate/heavy freezing rain
      1204: <CloudSnow className="w-8 h-8 text-cyan-300" />, // Light sleet
      1207: <CloudSnow className="w-8 h-8 text-cyan-400" />, // Moderate/heavy sleet
      1210: <CloudSnow className="w-8 h-8 text-cyan-200" />, // Patchy light snow
      1213: <CloudSnow className="w-8 h-8 text-cyan-300" />, // Light snow
      1216: <CloudSnow className="w-8 h-8 text-cyan-400" />, // Patchy moderate snow
      1219: <CloudSnow className="w-8 h-8 text-cyan-500" />, // Moderate snow
      1222: <CloudSnow className="w-8 h-8 text-cyan-600" />, // Patchy heavy snow
      1225: <CloudSnow className="w-8 h-8 text-cyan-700" />, // Heavy snow
      1237: <CloudSnow className="w-8 h-8 text-cyan-800" />, // Ice pellets
      1240: <CloudRain className="w-8 h-8 text-blue-300" />, // Light rain shower
      1243: <CloudRain className="w-8 h-8 text-blue-500" />, // Moderate/heavy rain shower
      1246: <CloudRain className="w-8 h-8 text-blue-700" />, // Torrential rain shower
      1249: <CloudSnow className="w-8 h-8 text-cyan-300" />, // Light sleet showers
      1252: <CloudSnow className="w-8 h-8 text-cyan-500" />, // Moderate/heavy sleet showers
      1255: <CloudSnow className="w-8 h-8 text-cyan-300" />, // Light snow showers
      1258: <CloudSnow className="w-8 h-8 text-cyan-500" />, // Moderate/heavy snow showers
      1261: <CloudSnow className="w-8 h-8 text-cyan-300" />, // Light showers of ice pellets
      1264: <CloudSnow className="w-8 h-8 text-cyan-500" />, // Moderate/heavy showers of ice pellets
      1273: <CloudRain className="w-8 h-8 text-purple-400" />, // Patchy light rain with thunder
      1276: <CloudRain className="w-8 h-8 text-purple-600" />, // Moderate/heavy rain with thunder
      1279: <CloudSnow className="w-8 h-8 text-purple-300" />, // Patchy light snow with thunder
      1282: <CloudSnow className="w-8 h-8 text-purple-500" />, // Moderate/heavy snow with thunder
    }
    
    return iconMap[conditionCode] || <Cloud className="w-8 h-8 text-slate-500" />
  }

  // Mock API call function
  const fetchWeather = async (city) => {
    if (!city.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const cityKey = city.toLowerCase().trim()
      
      if (MOCK_WEATHER_DATA[cityKey]) {
        setWeather(MOCK_WEATHER_DATA[cityKey])
        
        // Add to recent searches
        setRecentSearches(prev => {
          const filtered = prev.filter(item => item.toLowerCase() !== cityKey)
          return [city, ...filtered].slice(0, 5)
        })
      } else {
        throw new Error(`Weather data for "${city}" not available in demo. Try: Jakarta, New York, London, Tokyo`)
      }
      
      setSearch('')
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  // Real geolocation function
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            )
            const locationData = await response.json()
            
            const city = locationData.city || locationData.locality
            if (city) {
              setSearch(city)
              await fetchWeather(city)
            } else {
              throw new Error('Could not determine city name')
            }
          } catch (err) {
            setError('Failed to get location weather data')
          } finally {
            setLoading(false)
          }
        },
        (error) => {
          setLoading(false)
          setError('Location access denied or unavailable')
        }
      )
    } else {
      setError('Geolocation is not supported by this browser')
    }
  }

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('weather-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem('weather-recent-searches', JSON.stringify(recentSearches))
  }, [recentSearches])

  const formatTemperature = (temp) => {
    return unit === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`
  }

  const getWindUnit = () => {
    return unit === 'metric' ? 'km/h' : 'mph'
  }

  const getWindSpeed = (speed) => {
    return unit === 'metric' ? speed : (speed * 0.621371).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Nimbus
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Modern Weather Dashboard
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchWeather(search)}
                placeholder="Search for a city (Jakarta, New York, London, Tokyo)..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
            <button
              onClick={() => fetchWeather(search)}
              disabled={loading}
              className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              {loading ? '...' : 'Search'}
            </button>
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              title="Use current location"
            >
              <Navigation className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
          
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {recentSearches.map((city, index) => (
                <button
                  key={index}
                  onClick={() => fetchWeather(city)}
                  className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
          
          {/* Unit Toggle */}
          <div className="flex justify-center mt-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setUnit('metric')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unit === 'metric' 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  unit === 'imperial' 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-700 dark:text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Demo Notice */}
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="text-blue-700 dark:text-blue-400 text-center text-sm">
            🚀 <strong>Demo Mode</strong> - Using mock data. Available cities: Jakarta, New York, London, Tokyo
          </p>
        </div>

        {/* Current Weather */}
        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Weather Card */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {weather.location.name}, {weather.location.country}
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 capitalize">
                    {weather.current.condition.text}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  {getWeatherIcon(weather.current.condition.code)}
                  <div className="text-right">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white">
                      {formatTemperature(unit === 'metric' ? weather.current.temp_c : weather.current.temp_f)}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Feels like {formatTemperature(unit === 'metric' ? weather.current.feelslike_c : weather.current.feelslike_f)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Wind className="w-6 h-6 text-slate-600 dark:text-slate-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-600 dark:text-slate-400">Wind</div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {getWindSpeed(weather.current.wind_kph)} {getWindUnit()}
                  </div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Droplets className="w-6 h-6 text-slate-600 dark:text-slate-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-600 dark:text-slate-400">Humidity</div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {weather.current.humidity}%
                  </div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Gauge className="w-6 h-6 text-slate-600 dark:text-slate-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-600 dark:text-slate-400">Pressure</div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {weather.current.pressure_mb} hPa
                  </div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Eye className="w-6 h-6 text-slate-600 dark:text-slate-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-600 dark:text-slate-400">Visibility</div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {weather.current.vis_km} km
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Weather Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">UV Index</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {weather.current.uv}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Cloud Cover</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {weather.current.cloud || 'N/A'}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Air Quality</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Good
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Location</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {weather.location.lat.toFixed(2)}, {weather.location.lon.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3-Day Forecast */}
        {weather && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 text-lg">3-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weather.forecast.forecastday.map((day, index) => (
                <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="font-medium text-slate-900 dark:text-white mb-2">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="mb-3 flex justify-center">
                    {getWeatherIcon(day.day.condition.code)}
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {formatTemperature(unit === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {formatTemperature(unit === 'metric' ? day.day.mintemp_c : day.day.mintemp_f)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 capitalize mt-2">
                    {day.day.condition.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div className="text-center py-16">
            <Cloud className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Welcome to Nimbus Weather
            </h3>
            <p className="text-slate-500 dark:text-slate-500 max-w-md mx-auto">
              Search for a city, use your current location, or try one of these: 
              Jakarta, New York, London, Tokyo
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherApp