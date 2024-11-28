document.addEventListener("DOMContentLoaded" , () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "324451ecadde46f183a203104241511";

    getWeatherBtn.addEventListener('click' , async () => {
        const city = cityInput.value.trim();
        if(!city){
            return;
        }

        try {
            const weatherData =  await fetchWeather(city);
            displayWeather(weatherData);
        } catch (error) {
            showError()
        }



    })

    async function fetchWeather(city){
        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`

        const response = await fetch(url)

        console.log(typeof response)
        console.log("response, " ,response)

        if(!response.ok){
            throw new Error("City not found")
        }

        const data = await response.json();

        return data
    }

    function displayWeather(data){
        console.log(data)

        const {location , current} = data


        
        cityNameDisplay.textContent = `City: ${location.name}`
        temperature.textContent = `Temprature is ${current.temp_c}°C`
        description.textContent = `Weather Condition: ${current.condition.text}`

        // console.log(cityNameDisplay)
        // console.log(temperature)
        // console.log(description)

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden")
        
        

        
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden')
    }

})