const express = require('express');
const path = require('path');
const multer = require('multer'); // For handling file uploads

const app = express();
const port = 3000; // or 4000 if the default port is in use

// In-memory storage for volunteer data
let volunteers = [];

// Set up middleware to serve static files (frontend)
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Set up file upload configuration with Multer (for certification file uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Set upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    }
});
const upload = multer({ storage: storage });

// Serve the index.html when users access the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle volunteer registration
app.post('/register', upload.single('certification'), (req, res) => {
    const { name, email, availability, skills } = req.body;

    // Create volunteer object
    const newVolunteer = {
        id: Date.now(),
        name,
        email,
        availability,
        skills,
        certification: req.file ? req.file.path : null, // Store file path if uploaded
    };

    // Store volunteer data in memory (volunteers array)
    volunteers.push(newVolunteer);

    console.log('New Volunteer Registered:', newVolunteer);

    // Send back a response to the frontend
    res.status(200).json({ message: 'Registration Successful', volunteer: newVolunteer });
});

// Route to list all volunteers (for demonstration purposes)
app.get('/volunteers', (req, res) => {
    res.json(volunteers);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

localStorage.setItem('volunteers', JSON.stringify(volunteers));