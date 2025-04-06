// Get references to the form and success message elements
// The form element is identified by its ID 'google-form'
const form = document.getElementById('google-form');

// The success message element is identified by its ID 'success-message'
const successMessage = document.getElementById('success-message');

// Initially hide the success message by setting its display style to 'none'
successMessage.style.display = 'none';

// Add an event listener to the form to handle the 'submit' event
form.addEventListener('submit', function (e) {
    // Prevent the default form submission behavior (e.g., page reload)
    e.preventDefault();

    // Create a FormData object from the form, which collects all form inputs
    const formData = new FormData(form);

    // Send the form data to the server using the Fetch API
    fetch('url here', {
        method: 'POST', // Use the POST method to send data
        mode: 'no-cors', // Use 'no-cors' mode to avoid CORS issues
        body: formData // Attach the form data as the request body
    })
    .then(() => {
        // On successful submission, hide the form
        form.style.display = 'none';

        // Display the success message
        successMessage.style.display = 'block';
    })
    .catch((error) => {
        // If an error occurs, alert the user and log the error to the console
        alert('Something went wrong. Try again.');
        console.error('Error!', error.message);
    });
});
