
// document.addEventListener("DOMContentLoaded", function() {
//     // Function to update copyright year
//     const updateCopyright = () => {
//         const currentYear = new Date().getFullYear();
//         document.querySelector("#copyright").innerHTML = `© ${currentYear} Anana Agwu Ezikpe`;
//     };

//     // Function to update last modified date
//     const updateLastModified = () => {
//         const lastModified = document.lastModified;
//         document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
//     };

//     // Function to fetch and update geolocation data
//     const updateGeolocation = () => {
//         const countryInfo = document.getElementById("countryInfo");

//         // Fetch geolocation data from GeoJS
//         fetch('https://get.geojs.io/v1/ip/geo.json')
//             .then(response => response.json())
//             .then(data => {
//                 const { country, country_code, latitude, longitude } = data;
//                 const countryFlagUrl = `https://www.countryflags.io/${country_code}/flat/64.png`;

//                 // Update country info with country name and flag
//                 countryInfo.innerHTML = ` ${country}`;

//                 // Fetch and update weather info
//                 updateWeather(latitude, longitude);
//             })
//             .catch(error => {
//                 console.error('Error fetching geolocation data:', error);
//                 countryInfo.textContent = 'Country: Unavailable';
//             });
//     };

//     // Function to update weather information
//     const updateWeather = (lat, lon) => {
//         const weatherInfo = document.getElementById("weatherInfo");

//         // Fetch weather data from Open-Meteo
//         fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
//             .then(response => response.json())
//             .then(weatherData => {
//                 const weather = weatherData.current_weather;
//                 weatherInfo.textContent = `Temperature: ${weather.temperature}°C`;
//             })
//             .catch(error => {
//                 console.error('Error fetching weather data:', error);
//                 weatherInfo.textContent = 'Weather: Unavailable';
//             });
//     };

//     // Call all update functions when DOM content is loaded
//     updateCopyright();
//     updateLastModified();
//     updateGeolocation();
// });


document.addEventListener("DOMContentLoaded", function() {
    // Function to update copyright year
    const updateCopyright = () => {
        const currentYear = new Date().getFullYear();
        document.querySelector("#copyright").innerHTML = `© ${currentYear} Anana Agwu Ezikpe`;
    };

    // Function to update last modified date
    const updateLastModified = () => {
        const lastModified = document.lastModified;
        document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
    };

    // Function to fetch and update geolocation data
    const updateGeolocation = () => {
        const countryInfo = document.getElementById("countryInfo");

        // Fetch geolocation data from GeoJS
        fetch('https://get.geojs.io/v1/ip/geo.json')
            .then(response => response.json())
            .then(data => {
                const { country, country_code, latitude, longitude } = data;
                const countryFlagUrl = `https://www.countryflags.io/${country_code}/flat/64.png`;

                // Update country info with country name and flag
                countryInfo.innerHTML = `Country: ${country}`;

                // Fetch and update weather info
                updateWeather(latitude, longitude);
            })
            .catch(error => {
                console.error('Error fetching geolocation data:', error);
                countryInfo.textContent = 'Country: Unavailable';
            });
    };

    // Function to update weather information
    const updateWeather = (lat, lon) => {
        const weatherInfo = document.getElementById("weatherInfo");

        // Fetch weather data from Open-Meteo
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
            .then(response => response.json())
            .then(weatherData => {
                const weather = weatherData.current_weather;
                weatherInfo.textContent = `Temperature: ${weather.temperature}°C`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.textContent = 'Weather: Unavailable';
            });
    };

    // Function to update visit count
    const updateVisitCount = () => {
        let visits = localStorage.getItem('visitCount');

        if (visits) {
            visits = parseInt(visits) + 1;
        } else {
            visits = 1;
        }

        localStorage.setItem('visitCount', visits);
        document.getElementById('visitCount').textContent = `Visits: ${visits}`;
    };

    // Call all update functions when DOM content is loaded
    updateCopyright();
    updateLastModified();
    updateGeolocation();
    updateVisitCount();
});

