const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

let chaptersArray = getChapterList() || [];

// Populate the displayed list of chapters
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener('click', () => {
    if (input.value !== '') {
        displayList(input.value); // Call the function that outputs the submitted chapter
        chaptersArray.push(input.value); // Add the chapter to the array
        setChapterList(); // Update the localStorage with the new array
        input.value = ''; // Clear the input
        input.focus(); // Set the focus back to the input
    }
});

function displayList(item) {
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');
    li.textContent = item; // Note the use of the displayList parameter 'item'
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete'); // This references the CSS rule .delete { width: fit-content; } to size the delete button
    li.append(deleteButton);
    list.append(li);
    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent); // Note this new function that is needed to remove the chapter from the array and localStorage
        input.focus(); // Set the focus back to the input
    });
}

function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); // Slice off the last character
    chaptersArray = chaptersArray.filter(item => item !== chapter); // Filter out the chapter to be removed
    setChapterList();
}
