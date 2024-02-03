const express = require('express');
const cors = require('cors');
const fs = require('fs');
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

// File path
const FILE_PATH = './reservations.json';

// Read reservations from file
function readReservations() {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
}

// Write reservations to file
function writeReservations(reservations) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(reservations, null, 2), 'utf8');
}

// Endpoint to create a new reservation
app.post('/reserve', (req, res) => {
    const { name, date, time } = req.body;
    if (!name || !date || !time) {
        return res.status(400).send({ message: 'Missing reservation details' });
    }

    const reservations = readReservations();
    reservations.push({ name, date, time });
    writeReservations(reservations);

    res.send({ message: 'Reservation successful', reservation: { name, date, time } });
});

// Endpoint to list all reservations
app.get('/reservations', (req, res) => {
    const reservations = readReservations();
    res.send(reservations);
});

function readReservations() {
    try {
        let data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading from file:', error);
        return [];
    }
}

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

