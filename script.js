const apikey = "ea93a58b6d5743f4b0b105304242801";
const apiurl = `http://api.weatherapi.com/v1/current.json?aqi=yes&q=`;

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatericon = document.querySelector(".weater-icon");

async function cheakweathear(city) {
  const responce = await fetch(apiurl + city + `&key=${apikey}`);
  if (responce.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await responce.json();

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.current.temp_c) + "°c";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

    if (data.current.condition.text == "Patchy rain nearby") {
      weatericon.src = "images/mist.png";
    } else if (data.current.condition.text == "Sunny") {
      weatericon.src = "images/clear.png";
    } else if (
      data.current.condition.text == "Moderate or heavy rain shower "
    ) {
      weatericon.src = "images/rain.png";
    } else if (data.current.condition.text == "Light rain shower") {
      weatericon.src = "images/drizzle.png";
    } else if (data.current.condition.text == "Cloudy") {
      weatericon.src = "images/clouds.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchbtn.addEventListener("click", () => {
  cheakweathear(searchbox.value);
});
