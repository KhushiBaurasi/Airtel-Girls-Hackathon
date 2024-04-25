const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector("header i");

const apiKey = "YOUR_API"; // Replace with your actual API key
let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geolocation API");
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&maptype=satellite&key=${apiKey}`;
  fetchData();
}

function fetchData() {
  // You can use 'fetch' or any other method to fetch the data
  // Here, you can modify the code to fetch the satellite image data
  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob(); // Assuming the response is an image
    })
    .then((blob) => {
      // Assuming 'wIcon' is the container for the satellite image
      wIcon.src = URL.createObjectURL(blob);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

function onError(error) {
  console.error("Error occurred while retrieving location:", error);
}
