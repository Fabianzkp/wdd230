// Set the last modified date in the footer
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

// Add copyright information
const currentYear = new Date().getFullYear();
document.getElementById('copyright').textContent = `© ${currentYear} Anana Agwu Ezikpe. All rights reserved.`;
