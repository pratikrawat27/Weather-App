const apiKey = '224faf55ca8ad324b8e94331d33b1be6';

let weather = {
    fetchWeather: (city) => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            weather.displayWeather(data);
        });
    }, 
    displayWeather: (data) => {
        const { name } = data;   //It will take the name from the obj
        const { description , icon } = data.weather[0];
        const { humidity , temp } = data.main;
        const { speed } = data.wind;

        //Displaying info on page
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.weather-icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.weather-description').innerText = description;
        document.querySelector('.weather-humidity').innerText = 'Humidity: ' + humidity +'%';
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.weather-wind').innerText = 'Wind Speed: ' + speed + ' km/h';
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: () => {
        weather.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector('.search-btn').addEventListener('click', () => {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        weather.search();
    }
});

window.addEventListener('load', () => {
    if (document.querySelector('.search-bar').value !== ''){
        document.querySelector('.search-bar').value = '';
    }
});

weather.fetchWeather('Panvel');