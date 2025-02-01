// Define the owner's credentials (email & password)
const OWNER_EMAIL = "anudeepthiswami@gmail.com";
const OWNER_PASSWORD = "KLH@1234"; // Change this to a secure password

// Retrieve stored volunteers from localStorage or initialize as an empty array
let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];

// Check user authentication
let userEmail = localStorage.getItem('userEmail');
let isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

if (!isAuthenticated) {
    userLogin();
}

// Function to prompt for owner login
function userLogin() {
    let attempts = 3;

    while (attempts > 0) {
        const enteredEmail = prompt("Enter your email:");
        const enteredPassword = prompt("Enter your password:");

        if (enteredEmail === OWNER_EMAIL && enteredPassword === OWNER_PASSWORD) {
            alert("Login successful!");
            localStorage.setItem('userEmail', enteredEmail);
            localStorage.setItem('isAuthenticated', 'true');
            isAuthenticated = true;
            checkAuthentication();
            return;
        } else {
            attempts--;
            alert(`Incorrect credentials. You have ${attempts} attempts left.`);
        }
    }

    alert("Too many failed attempts. Access denied.");
    window.location.href = "unauthorized.html"; // Redirect to an unauthorized page (optional)
}

// Function to generate a unique 4-digit volunteer ID
function generateVolunteerID() {
    let id;
    do {
        id = Math.floor(1000 + Math.random() * 9000);
    } while (volunteers.some(v => v.id === id));
    return id;
}

// Function to display the list of volunteers and their tasks
function displayVolunteers() {
    const volunteerListContainer = document.getElementById('volunteer-task-list');
    if (!volunteerListContainer) return;

    volunteerListContainer.innerHTML = '';

    volunteers.forEach(volunteer => {
                const volunteerItem = document.createElement('li');
                volunteerItem.innerHTML = `
            <p><strong>ID:</strong> ${volunteer.id}</p>
            <p><strong>Name:</strong> ${volunteer.name}</p>
            <p><strong>Email:</strong> ${volunteer.email}</p>
            <ul>
                ${volunteer.tasks.length > 0
                    ? volunteer.tasks.map(task => `<li><strong>${task.name}</strong>: ${task.description}</li>`).join('')
                    : '<li>No tasks assigned yet</li>'
                }
            </ul>
            <button class="remove-btn" onclick="removeVolunteer(${volunteer.id})">Remove</button>
        `;
        volunteerListContainer.appendChild(volunteerItem);
    });
}

// Function to populate the volunteer dropdown for task assignment (ID visible)
function populateVolunteerDropdown() {
    const selectVolunteer = document.getElementById('select-volunteer');
    if (!selectVolunteer) return;

    selectVolunteer.innerHTML = '<option value="" disabled selected>Select a volunteer</option>';

    if (volunteers.length === 0) {
        selectVolunteer.innerHTML += '<option value="" disabled>No volunteers available</option>';
        return;
    }

    volunteers.forEach(volunteer => {
        const option = document.createElement('option');
        option.value = volunteer.id;
        option.textContent = `ID: ${volunteer.id} - ${volunteer.name}`;
        selectVolunteer.appendChild(option);
    });
}

// Show or hide volunteer form based on authentication
function checkAuthentication() {
    const volunteerForm = document.getElementById('volunteer-form-container');
    if (!volunteerForm) return;

    if (!isAuthenticated) {
        volunteerForm.style.display = 'none';
    }
}

// Add Volunteer to the List
const volunteerForm = document.getElementById('volunteer-form');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!isAuthenticated) {
            alert("Only the owner can add volunteers.");
            return;
        }

        const volunteerName = document.getElementById('volunteer-name-input')?.value.trim();
        const volunteerEmail = document.getElementById('volunteer-email-input')?.value.trim();

        if (!volunteerName || !volunteerEmail) {
            alert('Name and Email are required.');
            return;
        }

        const volunteer = {
            id: generateVolunteerID(),
            name: volunteerName,
            email: volunteerEmail,
            tasks: [],
        };

        volunteers.push(volunteer);
        localStorage.setItem('volunteers', JSON.stringify(volunteers));

        document.getElementById('volunteer-form').reset();
        populateVolunteerDropdown();
        displayVolunteers();

        alert('Volunteer added successfully!');
    });
}

// Assign Task to a Volunteer
document.getElementById('task-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = document.getElementById('task-name-input')?.value.trim();
    const taskDescription = document.getElementById('task-description-input')?.value.trim();
    const selectedVolunteerID = document.getElementById('select-volunteer')?.value;

    if (!taskName || !taskDescription || !selectedVolunteerID) {
        alert('Please complete all fields.');
        return;
    }

    const volunteer = volunteers.find(v => v.id == selectedVolunteerID);

    if (!volunteer) {
        console.error('Volunteer not found:', selectedVolunteerID, volunteers);
        alert('Volunteer not found.');
        return;
    }

    volunteer.tasks.push({ name: taskName, description: taskDescription });
    localStorage.setItem('volunteers', JSON.stringify(volunteers));

    document.getElementById('task-form').reset();
    displayVolunteers();

    alert('Task assigned successfully!');
});

// Function to remove a volunteer
function removeVolunteer(volunteerID) {
    volunteers = volunteers.filter(v => v.id !== volunteerID);
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
    displayVolunteers();
    populateVolunteerDropdown();
    alert('Volunteer removed successfully!');
}

// Function to logout
function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    alert("You have logged out.");
    location.reload();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayVolunteers();
    populateVolunteerDropdown();
    checkAuthentication();
});