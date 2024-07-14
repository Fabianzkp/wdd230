document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const emailInput = document.getElementById('email');
    const form = document.querySelector('.formapp');

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
                const { country, country_code } = data;
                countryInfo.textContent = `Country: ${country}`;
            })
            .catch(error => {
                console.error('Error fetching geolocation data:', error);
                countryInfo.textContent = 'Country: Unavailable';
            });
    };

    // Function to validate password match on form submit
    const validatePasswordMatch = () => {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue !== confirmPasswordValue) {
            // Display error message near confirm password input
            displayErrorMessage('Passwords do not match. Please try again.', confirmPasswordInput);
            clearPasswords();
            return false; // Prevent form submission
        }

        return true; // Allow form submission
    };

    // Function to validate password format (alphanumeric)
    const validatePasswordFormat = () => {
        const passwordValue = passwordInput.value.trim();
        const alphanumericRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;

        if (!alphanumericRegex.test(passwordValue)) {
            // Display error message for alphanumeric requirement
            displayErrorMessage('Password must be at least 8 characters long and contain both letters and numbers.', passwordInput);
            clearPasswords();
            return false; // Prevent form submission
        }

        return true; // Allow form submission
    };

    // Function to validate email format (must end with @byui.edu)
    const validateEmailFormat = () => {
        const emailValue = emailInput.value.trim();
        const byuiEmailRegex = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;

        if (!byuiEmailRegex.test(emailValue)) {
            // Display error message for email format
            displayErrorMessage('Please enter a valid @byui.edu email address.', emailInput);
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

    // Function to clear password fields
    const clearPasswords = () => {
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        passwordInput.focus();
    };

    // Function to clear email field
    const clearEmail = () => {
        emailInput.value = '';
        emailInput.focus();
    };

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        // Remove any existing error messages before validation
        const existingErrorMessages = form.querySelectorAll('p.error-message');
        existingErrorMessages.forEach(errorMessage => errorMessage.remove());

        // Validate password match
        if (!validatePasswordMatch()) {
            event.preventDefault(); // Prevent form submission if passwords do not match
            return;
        }

        // Validate password format (alphanumeric)
        if (!validatePasswordFormat()) {
            event.preventDefault(); // Prevent form submission if password format is invalid
            return;
        }

        // Validate email format (@byui.edu)
        if (!validateEmailFormat()) {
            event.preventDefault(); // Prevent form submission if email format is invalid
            return;
        }

        // Redirect to success page
        window.location.href = 'record.html?status=success';
    });

    // Call all update functions when DOM content is loaded
    updateCopyright();
    updateLastModified();
    updateGeolocation();
});
