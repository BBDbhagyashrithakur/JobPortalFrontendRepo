function createRegistrationForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
        <h1>Registration Form</h1>
        <form action="/user/register" method="post">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required><br><br>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit">Register</button>
        </form>
    `;
    return formContainer;
}

document.addEventListener('DOMContentLoaded', function() {
    const registrationLink = document.getElementById('registrationLink');
    const registrationFormContainer = document.getElementById('registrationFormContainer');

    registrationLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior

        registrationFormContainer.innerHTML = ''; // Clear previous content
        const registrationForm = createRegistrationForm();
        registrationFormContainer.appendChild(registrationForm);
        registrationFormContainer.style.display = 'block'; // Show the form
    });
});
