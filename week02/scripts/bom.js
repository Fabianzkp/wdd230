const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function(){
    if (input.value !== '') {
        const li = document.createElement('li'); // Create li element
        li.textContent = input.value; // Populate li element with input value
        
        const deleteButton = document.createElement('button'); // Create delete button
        deleteButton.textContent = '❌'; // Set delete button text
        deleteButton.classList.add('delete'); // Add a class for styling
        
        // Add event listener to delete button to remove li element
        deleteButton.addEventListener('click', function() {
            list.removeChild(li); // Remove li element from list
            input.focus(); // Return focus to input field
        });
        
        li.appendChild(deleteButton); // Append delete button to li element
        list.appendChild(li); // Append li element to list
        
        input.value = ''; // Clear input field
        input.focus(); // Return focus to input field
    } else {
        input.focus(); // Return focus to input field if input is blank
    }
});