document.addEventListener("DOMContentLoaded", function() {
    const weatherApiKey = '19986686d43ac7cac75b81de240e71b0';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=4.975394198277854&lon=8.339750278691453&appid=${weatherApiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=4.975394198277854&lon=8.339750278691453&appid=${weatherApiKey}&units=metric`;

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

                // Update country info with country name and flag
                countryInfo.innerHTML = `Country you are browsing from: ${country}`;
            })
            .catch(error => {
                console.error('Error fetching geolocation data:', error);
                countryInfo.textContent = 'Country: Unavailable';
            });
    };


  // Function to fetch and update weather info
    const updateWeather = () => {
        // Fetch current weather
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon; // e.g., '01d'

                // Update weather info
                document.getElementById('current-temperature').textContent = `Temperature: ${Math.round(temp)}°C`;
                document.getElementById('current-description').textContent = `Description: ${description}`;
                document.getElementById('current-weather-icon').innerHTML = `
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('current-temperature').textContent = 'Temperature: Unavailable';
                document.getElementById('current-description').textContent = 'Description: Unavailable';
            });

        // Fetch 3-day forecast
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                // Filter the forecast list to get data points at 24-hour intervals, starting from the next day
                const forecastList = data.list.slice(8, 8 + 3 * 8).filter((_, index) => index % 8 === 0); // Start from the 9th entry and pick every 8th entry
                const forecastContainer = document.getElementById('forecast');
                
                forecastContainer.innerHTML = `<h3>Three-Day Forecast</h3>`; // Add a header for the forecast

                forecastList.forEach((day, index) => {
                    const date = new Date(day.dt * 1000).toLocaleDateString();
                    const temp = Math.round(day.main.temp);
                    const description = day.weather[0].description;
                    const icon = day.weather[0].icon;

                    forecastContainer.innerHTML += `
                        <div class="forecast-day" id="day${index + 1}">
                            <p>Date: ${date}</p>
                            <p>Temp: ${temp}°C</p>
                            <p>Description: ${description}</p>
                            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                        </div>
                    `;
                });
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
                document.getElementById('forecast').innerHTML = 'Forecast: Unavailable';
            });
    };


    // Toggle navigation menu for mobile view
    const hamburgerElement = document.querySelector('#myButton');
    const navElement = document.querySelector('.menulinks');

    hamburgerElement.addEventListener('click', function() {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
    });

    // Function to set timestamp value
    const setTimestamp = () => {
        const timestampInput = document.getElementById('timestamp');
        if (timestampInput) {
            const now = new Date();
            timestampInput.value = now.toISOString(); // Set timestamp as ISO string
        }
    };

    // Handle form submission
    const form = document.querySelector('.form'); // Assuming your form has a class "form"
    if (form) {
        form.addEventListener('submit', function(event) {
            // Set timestamp just before form submission
            setTimestamp();

            // Other form validation and submission logic
            const emailInput = document.getElementById('email'); // Example: Replace with actual input field IDs
            const isValidEmail = validateEmailFormat(emailInput);

            if (!isValidEmail) {
                event.preventDefault(); // Prevent form submission if email format is invalid
                return;
            }

            // Ensure timestamp is included in the URL
            const formAction = new URL(form.action);
            formAction.searchParams.set('timestamp', document.getElementById('timestamp').value);
            form.action = formAction.toString();
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
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = '';
            emailInput.focus();
        }
    };

    // Handle thank you page display
    const handleThankYouPage = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const timestamp = urlParams.get('timestamp');
        if (timestamp) {
            const receivedTimestamp = new Date(timestamp).toLocaleString();
            const receivedTimestampElement = document.getElementById('receivedTimestamp');
            if (receivedTimestampElement) {
                receivedTimestampElement.textContent = `Your submission was received at: ${receivedTimestamp}`;
            }
        }
    };

    // Call thank you page function if on thankyou.html
    if (window.location.pathname.includes('thankyou.html')) {
        handleThankYouPage();
    }

    // Function to fetch and display member data
    const displayMembers = (members) => {
        const directory = document.getElementById("memberDirectory");
        directory.innerHTML = ""; // Clear existing content
        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.className = "member-card";
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.membershipLevel}</p>
                <p>${member.otherInfo}</p>
            `;
            directory.appendChild(memberCard);
        });
    };

    // Function to toggle between grid and list views
    const toggleView = () => {
        const directory = document.getElementById("memberDirectory");
        const toggleViewButton = document.getElementById("toggleView");

        toggleViewButton.addEventListener("click", () => {
            directory.classList.toggle("list-view");
            directory.classList.toggle("grid-view");
        });
    };

    // Fetch member data from JSON file
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            displayMembers(data);
            toggleView();
        })
        .catch(error => console.error("Error fetching member data:", error));

    // Call all update functions when DOM content is loaded


 
    // Fetch member data from JSON file FOR CHAMBER SPOTLIGHT 
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Filter members with silver or gold membership levels
            const qualifiedMembers = data.filter(member => 
                member.membershipLevel.toLowerCase() === "silver" || 
                member.membershipLevel.toLowerCase() === "gold"
            );

            // Function to get random members
            const getRandomMembers = (members, count) => {
                const shuffled = members.sort(() => 0.5 - Math.random());
                return shuffled.slice(0, count);
            };

            // Get 2 to 3 random qualified members
            const spotlightMembers = getRandomMembers(qualifiedMembers, Math.floor(Math.random() * 2) + 2);

            // Display the selected members
            const spotlightContainer = document.getElementById("spotlights");
            spotlightMembers.forEach(member => {
                const memberSpotlight = document.createElement("div");
                memberSpotlight.className = "spotlight";
                memberSpotlight.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p>${member.otherInfo}</p>
                    <p>Membership Level: ${member.membershipLevel}</p>
                `;
                spotlightContainer.appendChild(memberSpotlight);
            });
        })
        .catch(error => console.error("Error fetching member data:", error));

        

    updateCopyright();
    updateLastModified();
    updateGeolocation();
    updateWeather();
});
