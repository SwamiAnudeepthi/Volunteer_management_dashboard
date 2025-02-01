// Retrieve stored volunteers from localStorage or initialize as an empty array
let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];

// Function to generate a unique 4-digit Volunteer ID
function generateUniqueID() {
    let id;
    do {
        id = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    } while (volunteers.some(vol => vol.id === id)); // Ensure ID is unique
    return id;
}

// Function to display the list of volunteers (with name, email, phone, address, and tasks)
function displayVolunteers() {
    const volunteerListContainer = document.getElementById('volunteer-task-list');
    if (!volunteerListContainer) return;

    // Clear previous volunteer list
    volunteerListContainer.innerHTML = '';

    // Populate the list of volunteers
    volunteers.forEach(volunteer => {
                const volunteerItem = document.createElement('li');
                volunteerItem.innerHTML = `
            <p><strong>ID:</strong> ${volunteer.id}</p>
            <p><strong>Name:</strong> ${volunteer.name}</p>
            <p><strong>Email:</strong> ${volunteer.email}</p>
            <p><strong>Phone:</strong> ${volunteer.phone || 'N/A'}</p>
            <p><strong>Address:</strong> ${volunteer.address || 'N/A'}</p>
            <ul>
                ${volunteer.tasks.length > 0
                    ? volunteer.tasks.map(task => `
                        <li><strong>${task.name}</strong>: ${task.description}</li>
                    `).join('')
                    : '<li>No tasks assigned yet</li>'
                }
            </ul>
            <button class="remove-btn" onclick="removeVolunteer(${volunteer.id})">Remove</button>
        `;
        volunteerListContainer.appendChild(volunteerItem);
    });
}

// Function to remove a volunteer by ID
function removeVolunteer(volunteerId) {
    const volunteerIndex = volunteers.findIndex(vol => vol.id === volunteerId);
    if (volunteerIndex !== -1) {
        volunteers.splice(volunteerIndex, 1);
        localStorage.setItem('volunteers', JSON.stringify(volunteers));
        displayVolunteers(); // Refresh the volunteer list
        alert('Volunteer removed successfully!');
    } else {
        alert('Volunteer not found!');
    }
}

// Add Volunteer to the List
document.getElementById('volunteer-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const volunteerName = document.getElementById('volunteer-name-input')?.value.trim();
    const volunteerEmail = document.getElementById('volunteer-email-input')?.value.trim();
    const volunteerPhone = document.getElementById('volunteer-phone-input')?.value.trim();
    const volunteerAddress = document.getElementById('volunteer-address-input')?.value.trim();

    if (!volunteerName || !volunteerEmail) {
        alert('Name and Email are required.');
        return;
    }

    const volunteer = {
        id: generateUniqueID(), // Assigning unique 4-digit ID
        name: volunteerName,
        email: volunteerEmail,
        phone: volunteerPhone || 'N/A',
        address: volunteerAddress || 'N/A',
        tasks: [], // Empty tasks by default
    };

    volunteers.push(volunteer);
    localStorage.setItem('volunteers', JSON.stringify(volunteers));

    document.getElementById('volunteer-form').reset();
    alert(`Volunteer added successfully! Your ID is ${volunteer.id}`);
    displayVolunteers(); // Update the volunteer list on the page
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayVolunteers(); // Ensure the volunteer list is displayed on page load
});