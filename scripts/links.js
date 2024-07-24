const baseURL = "https://fabianzkp.github.io/wdd230/";
const linksURL = "https://fabianzkp.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.weeks);
}

function displayLinks(weeks) {
    const container = document.querySelector('.card ul');
    container.innerHTML = ''; // Clear existing content

    weeks.forEach(week => {
        const weekItem = document.createElement('li');
        const weekTitle = document.createElement('h3');
        weekTitle.textContent = week.week;
        weekItem.appendChild(weekTitle);

        const linksList = document.createElement('ul');
        week.links.forEach(link => {
            const linkItem = document.createElement('li');
            const linkAnchor = document.createElement('a');
            linkAnchor.href = `${baseURL}${link.url}`;
            linkAnchor.textContent = link.title;
            linkItem.appendChild(linkAnchor);
            linksList.appendChild(linkItem);
        });

        weekItem.appendChild(linksList);
        container.appendChild(weekItem);
    });
}

getLinks();
