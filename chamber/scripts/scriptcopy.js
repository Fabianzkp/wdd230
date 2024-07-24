document.addEventListener("DOMContentLoaded", function() {
    const weatherApiKey = '19986686d43ac7cac75b81de240e71b0';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=4.975394198277854&lon=8.339750278691453&appid=${weatherApiKey}&units=metric`;

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
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                document.getElementById('weatherInfo').innerHTML = `
                    Temperature: ${temp}°C<br>
                    Condition: ${description}<br>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weatherInfo').textContent = 'Weather: Unavailable';
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
    updateCopyright();
    updateLastModified();
    updateGeolocation();
    updateWeather();
});
