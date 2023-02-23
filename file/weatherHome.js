// we need the get the all importen element form the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const realFeel = document.querySelector('.realfeel');
const uv = document.querySelector('.uv');
// class selector all 
const cities = document.querySelectorAll('.city');
// id selector
const form = document.getElementById("locationInput");
const cloudOutPut = document.getElementById("cloud");
const humidityOutPut = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const icon = document.getElementById("icons");
const windOutPut = document.getElementById("wind");

// default city
cityInput = 'chandigarh';

// add the click event to each city in the search panel 
cities.forEach((city) => {
    city.addEventListener('click', (e) => {

        //changing from the defaul fom the cilcked one 
        cityInput = e.target.innerHTML;
        // function that fetches the data and display the data of weather api
        getData();
        // app.style.opacity = "0";
    })
});
// data access from the keyboard 
form.addEventListener('submit', (e) => {
    // if search bar is empty it throw an error  
    if (search.value.length === 0) {
        alert('please enter the city name');
    } else {
        cityInput = search.value;
        // console.log(cityInput);
        getData();
        search.value = "";
        // app.style.opacity = "0";
    }

    // preventing the befault befaviour of the form
    e.preventDefault();
});
// data access from the button
btn.addEventListener('click', (e) => {
    // if search bar is empty it throw an error  
    if (search.value.length === 0) {
        alert('please enter the city name');
    } else {
        cityInput = search.value;
        // console.log(cityInput);
        getData();
        search.value = "";
        // app.style.opacity = "0";
    }

    // preventing the befault befaviour of the form
    e.preventDefault();
});

function getData() {
    // this api for the location only
    let queryUrl2 = "http://api.openweathermap.org/geo/1.0/direct?";
    let loc = "q=" + `${cityInput}` + "&";
    let limit = "limit=10&";
    let apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
    let coordinates = queryUrl2 + loc + limit + apiKey;
    const getIP = async () => {
        let latt, city_name, longi, dt;
        await fetch(coordinates)
            .then((response) => response.json())
            .then((geo) => {
                // console.log(geo);
                city_name = geo[0].name;
                longi = geo[0].lon;
                latt = geo[0].lat;
            });
        let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
        let latitude = "lat=" + latt + "&";
        let longitude = "lon=" + longi + "&";
        let apiOptions = "units=metric&exclude=minutely,alerts&";
        let file = queryUrl + latitude + longitude + apiOptions + apiKey;
        // this api for weather details
        fetch(file)
            .then((response) => response.json())
            .then((data) => {
                // here we console log the data to see what is available
                console.log(data);
                // add the name of the city into the page
                nameOutput.innerHTML = city_name;
                // adding the temperature into the page
                temp.innerHTML = Math.floor(data.current.temp) + "°C";
                // adding weather condition into the page
                conditionOutput.innerHTML = data.current.weather[0].main;
                // geting the crosponding icon url for the weather and extract a part of it 
                // .substr("//openweathermap.org/img/wn/".length)
                const iconCode = data.current.weather[0].id;
                const iconDate = data.current.weather[0].icon;
                var get = iconDate.substr(2);
                
                var aagaya = iconCode + get;
                console.log(aagaya);
                icon.src = "/icons2/" + iconCode + get +".svg";

                // details
                cloudOutPut.innerHTML = data.current.clouds + "%";
                humidityOutPut.innerHTML = data.current.humidity + "%";
                windOutPut.innerHTML = data.current.wind_speed + " m/s";
                pressure.innerHTML = data.current.pressure + " hPa";
                realFeel.innerHTML = data.current.feels_like + " °C"
                uv.innerHTML = data.current.uvi;

                // get the date and time form the city and exteract the day month and year into individual variable
                // geting the crosponding icon url for the weather and extract a part of it 
                // const iconId = query.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
                
                // bindig the icon url according to the api data
                // icon.src = "./icons/" + iconId;

                // add the weather details to the page 
                // cloudOutPut.innerHTML = query.current.cloud + "%";
                // humidityOutPut.innerHTML = query.current.humidity + "%";
                // windOutPut.innerHTML = query.current.wind_kph + "km/h";

                // let hourNow = data.hourly[0].temp;
                // let hour1 = data.hourly[1].temp;
                // let hour2 = data.hourly[2].temp;
                // let hour3 = data.hourly[3].temp;
                // let hour4 = data.hourly[4].temp;
                // let hour5 = data.hourly[5].temp;

                // document.getElementById("wrapper-hour-now").innerHTML = hourNow + "°";
                // document.getElementById("wrapper-hour1").innerHTML = hour1 + "°";
                // document.getElementById("wrapper-hour2").innerHTML = hour2 + "°";
                // document.getElementById("wrapper-hour3").innerHTML = hour3 + "°";
                // document.getElementById("wrapper-hour4").innerHTML = hour4 + "°";
                // document.getElementById("wrapper-hour5").innerHTML = hour5 + "°";
                // let hourNow = data.hourly[0].temp;
                // timeOutput.innerHTML = hourNow + "°";


                // year 
                const date = new Date();
                let year = date.getFullYear();

                // months
                const month = ["January", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const m = new Date();
                let mname = month[m.getMonth()];
                
                // Day
                const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const day = new Date();
                let today = weekday[day.getDay()];

                dateOutput.innerHTML = today + " "+ mname + " " + year;

                // Time
                let H = new Date().getHours();
                let M = new Date().getMinutes();
                let timeNow;
                if (H > 12) {
                    H = "0" + H;
                    H = H - 12;
                    timeNow = H + ":" + M + " PM";
                }
                else {
                    timeNow = H + ":" + M + " AM";
                }
                timeOutput.innerHTML = timeNow;
                // console.log(Timeday);

                // let time1 = timeNow + 1;
                // let time2 = time1 + 1;
                // let time3 = time2 + 1;
                // let time4 = time3 + 1;
                // let time5 = time4 + 1;
                // //console.log(time1);

                // document.getElementById("wrapper-time1").innerHTML = time1;
                // document.getElementById("wrapper-time2").innerHTML = time2;
                // document.getElementById("wrapper-time3").innerHTML = time3;
                // document.getElementById("wrapper-time4").innerHTML = time4;
                // document.getElementById("wrapper-time5").innerHTML = time5;

                // // Weather daily data
                // let tomorrowTemp = Math.round(data.daily[0].temp.day);
                // let dATTemp = Math.round(data.daily[1].temp.day);
                // let tomorrowMain = data.daily[0].weather[0].main;
                // let dATTempMain = data.daily[1].weather[0].main;

                // // get the unique id for each weather condition
                // const code = query.current.condition.code;

            });

    }
    getIP();
}     