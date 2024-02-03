let endpoint = "https://haircutreservation.azurewebsites.net:3000";
//let endpoint = "localhost:3000";

document.getElementById("reservationForm").addEventListener("submit", function(event){
    event.preventDefault();

    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    fetch(`${endpoint}/reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date, time })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show confirmation message
        fetchReservations(); // Refresh the reservations list
    })
    .catch(error => console.error('Error:', error));
});

function fetchReservations() {
    fetch(`${endpoint}/reservations`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('reservations');
            list.innerHTML = ''; // Clear existing list
            data.forEach(reservation => {
                const listItem = document.createElement('li');
                listItem.textContent = `${reservation.name} - ${reservation.date} at ${reservation.time}`;
                list.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Call this function on page load and after making a reservation
fetchReservations();