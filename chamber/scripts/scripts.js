document.addEventListener("DOMContentLoaded", function() {
    // Function to update copyright year
    const updateCopyright = () => {
        const currentYear = new Date().getFullYear();
        document.getElementById("copyright").textContent = `${currentYear} Anana Agwu Ezikpe`;
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
                const { country, country_code } = data;
                const countryFlagUrl = `https://www.countryflags.io/${country_code}/flat/64.png`;

                // Update country info with country name
                countryInfo.textContent = `Country you are browsing from: ${country}`;
            })
            .catch(error => {
                console.error('Error fetching geolocation data:', error);
                countryInfo.textContent = 'Country: Unavailable';
            });
    };

    // Function to update weather information
    const updateWeather = () => {
        const weatherInfo = document.getElementById("weatherInfo");

        // Placeholder weather information
        const temperature = 25; //To be replace with actual weather data
        weatherInfo.textContent = `Temperature: ${temperature}°C`;
    };


    // Call all update functions when DOM content is loaded
    updateCopyright();
    updateLastModified();
    updateGeolocation();
    updateWeather();
});

// Toggle navigation menu for mobile view
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menulinks');

hamburgerElement.addEventListener('click', function(){
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});


