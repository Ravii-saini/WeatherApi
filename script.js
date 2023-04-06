
//selector variable for input and button
var city= document.querySelector("#inputCity")
var btn= document.querySelector(".btn")


//selector variable for all target element we wamt to change the innerText
var Acity=document.querySelector(".city")
var Aicon=document.querySelector(".icon")
var Atemp=document.querySelector(".temp")
var Ahumidity=document.querySelector(".Bhumidity")
var Adiscription=document.querySelector(".Bdiscription")
var Awind=document.querySelector(".Bwind")
var Avisibility=document.querySelector(".Bvisibility")
var Asunrise=document.querySelector(".Bsunrise")
var Asunset=document.querySelector(".Bsunset")
var Amintemp=document.querySelector(".Bmintemp")
var Amaxtemp=document.querySelector(".Bmaxtemp")
var Adate=document.querySelector(".date")

// Get your own free OWM API key at https://www.openweathermap.org/appid - please do not re-use mine!
// You don't need an API key for this to work at the moment, but this will change eventually.
apik = "1f084363b502b3ea60bf6ff2aebb38f6"
//kelvin to celcious
//fetch


/////
//Get Date and show on website
const now = new Date();
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dayOfWeek = weekdays[now.getDay()];
const dayOfMonth = now.getDate();
const month = months[now.getMonth()];
const year = now.getFullYear();

const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
Adate.innerHTML=formattedDate;
console.log(formattedDate);


/////
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  console.log(time);
  document.querySelector(".time").innerHTML = time;
}

setInterval(updateTime, 1000);


///function converting in local time
   function getTime(time){
    var sunriseTime = new Date(time * 1000);
    var sunriseTimeString = sunriseTime.toLocaleTimeString();
    return sunriseTimeString;
}



// Fetch weather function
   function fetchWeather(vall){
     backgroundImage(vall);
      fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&q='+vall+'&appid='+apik)
        .then(res => res.json())
         
       .then(data => {
           displayWeather(data);

         })
        .catch(err => alert('You entered Wrong city name!'));
    }



////a city if geolocation don't work
    fetchWeather("Dehli");
//////taking location and using opencageAPI for getting current location

navigator.geolocation.getCurrentPosition(function(position) {

    console.log("abcd");
    
    // Get the latitude and longitude
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
  
    let ApiUrl=`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apik}`;
  
    fetch(ApiUrl)
    .then(res => res.json())
     
   .then(data => {
       displayWeather(data);

     })
    .catch(err => alert('You entered Wrong city name!'));
  });

  ////background-image changing function
  ////
  function backgroundImage(vall){
  const accessKey = "tCiFTWG-M2kDceUQ121QeW53a64rPRAZHE9iaEJ-w5k";
  const endpoint = "https://api.unsplash.com/photos/random";
  
  fetch(`${endpoint}?client_id=${accessKey}&qquery=${vall}&query=weather&query=nature`)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.urls.full;
      document.body.style.backgroundImage = `url(${imageUrl})`;
      // document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "100%";
    })
    .catch(error => console.error(error));
  };
///display weather function
function displayWeather(data){

    console.log(data)

    var descrip = data['weather']['0']['description']
    var tempature = data['main']['temp']
    var tempMax = data['main']['temp_max']
    var tempMin = data['main']['temp_min']
    var humid = data['main']['humidity']
    var wndspd = data['wind']['speed']
    var cityName= data['name']
    var country= data['sys']['country']
    var sunRise= data['sys']['sunrise']
    var sunSet= data['sys']['sunset']
    var visib=data['visibility']
    var Icon = data['weather']['0']['icon']
    
   console.log(`dicription:${visib}`)

    Acity.innerHTML=`Weather in ${cityName},${country}`
    Aicon.src="https://openweathermap.org/img/wn/"+Icon+"@2x.png"
    Atemp.innerHTML=`${tempature}<span class="degree">°C </span>`

    Adiscription.innerHTML=descrip
     Ahumidity.innerHTML=humid+"%"
     Awind.innerHTML=wndspd+" km/h"
    Avisibility.innerHTML=visib
    Asunrise.innerHTML="Sunrise:  "+ getTime(sunRise)
     Asunset.innerHTML="Sunset:  "+ getTime(sunSet)
     Amintemp.innerHTML="Min Temp: "+tempMin+"°C"
     Amaxtemp.innerHTML="max temp: "+tempMax+"°C"

     city.value = "";
     
};



// eventlistener on function 
    btn.addEventListener('click', function(){
        fetchWeather(city.value);
    });


 
////eventListener for enter button 
    document.querySelector(".search-Bar").addEventListener("keydown", function(event) {
        console.log(event);
        if (event.key === "Enter") {
          // Prevent default action
          event.preventDefault();
          // Call fetchWeather function with city value entered in input field
          fetchWeather(city.value);
        }
      });


      

      ////
      
// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});