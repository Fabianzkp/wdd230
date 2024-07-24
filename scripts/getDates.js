document.addEventListener("DOMContentLoaded", function() {
    const weatherApiKey = '19986686d43ac7cac75b81de240e71b0';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=4.975394198277854&lon=8.339750278691453&appid=${weatherApiKey}&units=metric`;
    const ipinfoToken = '14e9427bfcf742'; // Replace with your actual IPinfo token

    // Mapping of country codes to full country names
    const countryNames = {
        "NG": "Nigeria",
        "US": "United States",
        "GB": "United Kingdom",
        "CA": "Canada",
        // Add other country codes and names as needed
    };

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

    // Function to update visit count
    const updateVisitCount = () => {
        let visits = localStorage.getItem('visitCount');
        if (visits) {
            visits = parseInt(visits) + 1;
        } else {
            visits = 1;
        }
        localStorage.setItem('visitCount', visits);
        document.getElementById('visitCount').textContent = visits;
    };

    // Function to fetch and update country info
    const fetchCountryInfo = async () => {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ip = ipData.ip;

            const response = await fetch(`https://ipinfo.io/${ip}?token=${ipinfoToken}`);
            const data = await response.json();
            displayCountryInfo(data);
        } catch (error) {
            console.error('Error fetching country data:', error);
            document.getElementById('countryInfo').textContent = 'Country info unavailable';
        }
    };

    const displayCountryInfo = (data) => {
        const countryInfo = document.getElementById('countryInfo');
        const countryCode = data.country;
        const countryName = countryNames[countryCode] || countryCode; // Use the full name if available, otherwise use the code
        countryInfo.textContent = `Country: ${countryName}`;
    };

    // Call all update functions when DOM content is loaded
    updateCopyright();
    updateLastModified();
    updateWeather();
    updateVisitCount();
    fetchCountryInfo();
});

const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menulinks');

hamburgerElement.addEventListener('click', function(){
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

const modeButton = document.querySelector("#mode");
const main = document.querySelector(".card");

modeButton.addEventListener("click", () => {
    if (modeButton.textContent.includes("🕶️")) {
        main.style.background = "#000";
        main.style.color = "#fff";
        modeButton.textContent = "🔆";
    } else {
        main.style.background = "#eee";
        main.style.color = "#000";
        modeButton.textContent = "🕶️";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const daysSinceLastVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit > 1 ? 'days' : 'day'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', now);
});
