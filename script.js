document.addEventListener("DOMContentLoaded", getMyLocation);

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation, displayError);
  } else {
    alert("Oops, no geolocation support");
  }
}

function displayLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let div = document.getElementById("location");
  div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
}

function computeDistance(startCoords, destCoords) {
  let startLatRads = degreesToRadians(startCoords.latitude);
  let startLongRads = degreesToRadians(startCoords.longitude);
  let destLatRads = degreesToRadians(destCoords.latitude);
  let destLongRads = degreesToRadians(destCoords.longitude);
  let Radius = 6371; // вказаний радіус землі у км
  let distance = Math.acos(Math.sin(startLatRads) * Math.cos(startLatRads) * Math.cos(startLongRads - destLongRads) + Math.sin(destLatRads) * Math.sin(startLatRads)) * Radius;
  return distance;
}

function degreesToRadians(degrees) {
  let radians = (degrees * Math.PI) / 180;
  return radians;
}

function displayError(error) {
  const errorTypes = {
    0: "Unknown error",
    1: "Permission denied by user",
    2: "Position is not available",
    3: "Request timed out"
  };
  let errorMessage = errorTypes[error.code];
  if (error.code === 0 || error.code === 2) {
    errorMessage = errorMessage + " " + error.message;
  }
  let div = document.getElementById("location");
  div.innerHTML = errorMessage;
}
