document.addEventListener('DOMContentLoaded', () => {
    // Get stored volunteers or initialize as an empty array
    let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];

    // Get the profile display container
    const profileDisplay = document.getElementById('profile-display');

    // Function to display all volunteers' profiles
    function displayAllVolunteers() {
        profileDisplay.innerHTML = ''; // Clear any existing content

        // Loop through each volunteer and display their details
        volunteers.forEach((volunteer, index) => {
            const volunteerItem = document.createElement('div');
            volunteerItem.classList.add('volunteer-item');
            volunteerItem.innerHTML = `
                <h3>Volunteer ID: ${volunteer.id}</h3>
                <p><strong>Name:</strong> ${volunteer.name}</p>
                <p><strong>Email:</strong> ${volunteer.email}</p>
                <p><strong>Phone:</strong> ${volunteer.phone || 'N/A'}</p>
                <p><strong>Address:</strong> ${volunteer.address || 'N/A'}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
            `;
            profileDisplay.appendChild(volunteerItem);
        });

        // Set up event listeners for the "Edit" buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                loadVolunteerToEdit(index); // Load selected volunteer for editing
            });
        });
    }

    // Function to load volunteer data into the edit form
    function loadVolunteerToEdit(index) {
        const volunteer = volunteers[index];

        if (!volunteer) {
            console.error("Volunteer not found.");
            return;
        }

        // Show the edit form and populate it with the current volunteer's details
        const editProfileContainer = document.createElement('section');
        editProfileContainer.innerHTML = `
            <h2>Edit Volunteer Profile</h2>
            <form id="edit-profile-form">
                <label for="edit-id">ID:</label>
                <input type="text" id="edit-id" value="${volunteer.id}" readonly>
                <label for="edit-name">Name:</label>
                <input type="text" id="edit-name" value="${volunteer.name}" required>
                <label for="edit-email">Email:</label>
                <input type="email" id="edit-email" value="${volunteer.email}" required>
                <label for="edit-phone">Phone:</label>
                <input type="text" id="edit-phone" value="${volunteer.phone || ''}">
                <label for="edit-address">Address:</label>
                <input type="text" id="edit-address" value="${volunteer.address || ''}">
                <button type="submit">Save Changes</button>
            </form>
        `;
        profileDisplay.innerHTML = ''; // Clear the profile display
        profileDisplay.appendChild(editProfileContainer);

        // Handle form submission to save updated volunteer details
        const editProfileForm = document.getElementById('edit-profile-form');
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get updated values from the form
            volunteer.name = document.getElementById('edit-name').value.trim();
            volunteer.email = document.getElementById('edit-email').value.trim();
            volunteer.phone = document.getElementById('edit-phone').value.trim();
            volunteer.address = document.getElementById('edit-address').value.trim();

            // Save the updated volunteer details to localStorage
            localStorage.setItem('volunteers', JSON.stringify(volunteers));

            // Reload the volunteer list and display the updated profiles
            displayAllVolunteers();
        });
    }

    // Display the volunteer list when the page loads
    displayAllVolunteers();
});