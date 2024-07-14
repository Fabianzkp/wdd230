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

    // Replace with your desired city and OpenWeatherMap API key
    const city = 'Lagos';
    const apiKey = 'e621d561bb4bb09a56dbe23915a8528e'; //OpenWeatherMap API key

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            weatherInfo.textContent = `Temperature: ${temperature}°C`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.textContent = 'Weather data: Unavailable';
        });
};

    // Toggle navigation menu for mobile view
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menulinks');

hamburgerElement.addEventListener('click', function(){
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});


    // Function to set timestamp value
    const setTimestamp = () => {
        const timestampInput = document.getElementById('timestamp');
        const now = new Date();
        timestampInput.value = now.toISOString(); // Set timestamp as ISO string
    };

    // Call all update functions when DOM content is loaded
    updateCopyright();
    updateLastModified();
    updateGeolocation();
    updateWeather();
});

    // Function to handle form submission
    const form = document.querySelector('.form'); // Assuming your form has a class "form"
    if (form) {
        form.addEventListener('submit', function(event) {
            // Update timestamp just before form submission
            setTimestamp();
            
            // Other form validation and submission logic
            const emailInput = document.getElementById('email'); // Example: Replace with actual input field IDs
            const isValidEmail = validateEmailFormat(emailInput);

            if (!isValidEmail) {
                event.preventDefault(); // Prevent form submission if email format is invalid
                return;
            }

            // Redirect to success page
            window.location.href = 'thankyou.html?status=success'; // Uncomment to enable redirection
        });

        // Optional: Update timestamp on form reset
        form.addEventListener('reset', setTimestamp);
    }

    // Function to validate email format (any email address)
    const validateEmailFormat = (emailInput) => {
        const emailValue = emailInput.value.trim();
        const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!generalEmailRegex.test(emailValue)) {
            // Display error message for email format
            displayErrorMessage('Please enter a valid email address.', emailInput);
            clearEmail();
            return false; // Prevent form submission
        }

        return true; // Allow form submission
    };

    // Function to display error message near an input field
    const displayErrorMessage = (message, inputField) => {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.style.fontWeight = 'bold';
        inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
    };

    // Function to clear email field
    const clearEmail = () => {
        emailInput.value = '';
        emailInput.focus();
    };
