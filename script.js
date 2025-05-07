let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(position) {
    const coords = position.coords;

    // Koordinater
    document.getElementById("latitude").textContent = coords.latitude.toFixed(6);
    document.getElementById("longitude").textContent = coords.longitude.toFixed(6);
    document.getElementById("accuracy").textContent = `${coords.accuracy} meter`;
    document.getElementById("altitude").textContent = coords.altitude !== null ? `${coords.altitude} meter` : "Ej tillgänglig";
    document.getElementById("accuracy-altitude").textContent = coords.altitudeAccuracy !== null ? `${coords.altitudeAccuracy} meter` : "Ej tillgänglig";

    // Hastighet
    const speedMps = coords.speed;
    const speedContainer = document.getElementById("speed-container");
    const speedDisplay = document.getElementById("speed");
    const currentSpeed = document.getElementById("currect-speed");

    if (speedMps !== null) {
        const speedKmh = speedMps * 3.6;
        speedDisplay.textContent = `${speedKmh.toFixed(2)} km/h`;

        // Färgkodning enligt uppgiften
        if (speedKmh < 5) {
            speedContainer.className = "alert alert-danger";
            currentSpeed.textContent = "långsam takt.";
        } else if (speedKmh < 10) {
            speedContainer.className = "alert alert-warning";
            currentSpeed.textContent = "medelhastighet.";
        } else {
            speedContainer.className = "alert alert-success";
            currentSpeed.textContent = "hög hastighet!";
        }
    } else {
        speedDisplay.textContent = "Ej tillgänglig";
        speedContainer.className = "alert alert-secondary";
        currentSpeed.textContent = "okänd hastighet.";
    }
}

function error(err) {
    console.warn("Något gick fel: ", err.message);
}

// Starta spårningen direkt när sidan laddas
navigator.geolocation.watchPosition(success, error, options);
