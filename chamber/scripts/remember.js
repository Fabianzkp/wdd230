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


// for the chamber directory page 
document.addEventListener('DOMContentLoaded', function() {
    const visitMessage = document.getElementById('visitMessage');
    
    // Retrieve last visit date from localStorage
    let lastVisit = localStorage.getItem('lastVisit');
    if (lastVisit) {
        lastVisit = new Date(lastVisit); // Convert stored date string to Date object
        const now = new Date(); // Current date
        
        // Calculate the difference in milliseconds between now and last visit
        const difference = now.getTime() - lastVisit.getTime();
        const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        
        // Displaying appropriate message based on the difference
        if (daysDifference === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    } else {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    }
    
    // Update localStorage with current visit date
    localStorage.setItem('lastVisit', new Date().toString());
});
