const baseURL = "https://fabianzkp.github.io/wdd230/";
const linksURL = "https://fabianzkp.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayLinks(data.weeks);
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}

function displayLinks(weeks) {
    const container = document.querySelector('.card ul');
    container.innerHTML = ''; // Clear existing content

    weeks.forEach(week => {
        const weekItem = document.createElement('li');
        
        const weekTitle = document.createElement('span');
        weekTitle.textContent = `${week.week}: `;
        weekItem.appendChild(weekTitle);

        week.links.forEach((link, index) => {
            const linkAnchor = document.createElement('a');
            linkAnchor.href = `${baseURL}${link.url}`;
            linkAnchor.textContent = link.title;

            weekItem.appendChild(linkAnchor);

            // Add separator only if it's not the last link
            if (index < week.links.length - 1) {
                const separator = document.createTextNode(' | ');
                weekItem.appendChild(separator);
            }
        });

        container.appendChild(weekItem);
    });
}

getLinks();
