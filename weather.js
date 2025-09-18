document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weathInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempDisplay = document.getElementById("temperature");
    const dscpDisplay = document.getElementById("description");
    const errorMessagedisplay = document.getElementById("error-message");

    const API_KEY = "03ab12d20f88aefa2b52a40862760673";

    getWeatherBtn.addEventListener('click',async ()=>{
        let city = cityInput.value.trim()
        if(!city) return;
        
        //it may throw an error
        //server database isin another continent

        try {   
            const weatherdata = await fetchWeatherData(city);
            displayWeatherData(weatherdata);
        } catch (error) {
            errorMessage()
        }


    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("Response ", response);

        if(!response.ok){
            throw new Error("City not found Nigga, you dont even know the spelling of your city  fyck youu bitch study harder")
        }
        const data = await response.json()
        return data
    }

    function displayWeatherData(data) {
      console.log(data);
      const {name, main, weather} = data
      cityNameDisplay.textContent = name
      tempDisplay.textContent = `Temperature : ${main.temp}`;
      dscpDisplay.textContent = `Weather : ${weather[0].description}`;
      
      weathInfo.classList.remove('hidden');
      errorMessage.classList.add('hidden');
      

    }

    function errorMessage(){
        weathInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }



})