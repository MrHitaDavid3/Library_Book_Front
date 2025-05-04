// Sample rooms data
const rooms = [
  { id: 777, capacity: "9", floor: 7, date: "2025-05-05", from: "18:30", until: "20:00" },
  { id: 667, capacity: "5", floor: 6, date: "2025-05-28", from: "9:00", until: "12:00" },
  { id: 888, capacity: "7", floor: 8, date: "2025-05-28", from: "9:30", until: "12:00" },
  { id: 300, capacity: "3", floor: 3, date: "2025-05-28", from: "9:00", until: "12:00" },
  { id: 700, capacity: "10", floor: 7, date: "2025-05-28", from: "9:30", until: "12:00" },
  { id: 867, capacity: "4", floor: 8, date: "2025-05-03", from: "19:30", until: "22:00" },
  { id: 780, capacity: "11", floor: 7, date: "2025-05-03", from: "21:00", until: "22:00" },  
  { id: 781, capacity: "11", floor: 7, date: "2025-05-03", from: "20:45", until: "22:00" },  
  { id: 882, capacity: "10", floor: 7, date: "2025-05-03", from: "20:45", until: "22:00" },  
  { id: 683, capacity: "9", floor: 7, date: "2025-05-03", from: "20:45", until: "22:00" },  



];

// Converts HH:MM to minutes for comparison
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

// Handle form submission
document.getElementById("room-filter-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const roomSize = document.getElementById("room-size").value;
  const floor = document.getElementById("floor").value;
  const date = document.getElementById("date").value;
  const fromTime = document.getElementById("from-time").value;
  const untilTime = document.getElementById("until-time").value;

  // Determine min/max based on selected size
  let minCap = 1, maxCap = 99;
  if (roomSize === "1-4") [minCap, maxCap] = [1, 4];
  else if (roomSize === "5-8") [minCap, maxCap] = [5, 8];
  else if (roomSize === "9-12") [minCap, maxCap] = [9, 12];

  const filteredRooms = rooms.filter(room => {
    const cap = parseInt(room.capacity);
    const matchesSize = roomSize === "Any" || (cap >= minCap && cap <= maxCap);
    const matchesFloor = floor === "Any" || room.floor === parseInt(floor);
    const matchesDate = room.date === date;

    let matchesTime = true;
    if (fromTime && untilTime) {
      const userFrom = timeToMinutes(fromTime);
      const userUntil = timeToMinutes(untilTime);
      const roomFrom = timeToMinutes(room.from);
      const roomUntil = timeToMinutes(room.until);

      matchesTime = roomFrom < userUntil && roomUntil > userFrom; // overlap logic
    }

    return matchesSize && matchesFloor && matchesDate && matchesTime;
  });

  displayRooms(filteredRooms);
});

// Display filtered rooms
function displayRooms(rooms) {
  const resultsContainer = document.getElementById("room-results");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (rooms.length === 0) {
    resultsContainer.innerHTML = "<p>No rooms match your criteria.</p>";
  } else {
    rooms.forEach(room => {
      const roomElement = document.createElement("div");
      roomElement.classList.add("room");
      roomElement.innerHTML = `
        <p><strong>Room ID:</strong> ${room.id}</p>
        <p><strong>Capacity:</strong> ${room.capacity} people</p>
        <p><strong>Floor:</strong> ${room.floor}</p>
        <p><strong>Date:</strong> ${room.date}</p>
        <p><strong>Time:</strong> ${room.from} - ${room.until}</p>
        <button onclick="reserveRoom(${room.id})">Reserve</button>
      `;
      resultsContainer.appendChild(roomElement);
    });
  }
}

// Handle reservation
function reserveRoom(roomId) {
  const selected = rooms.find(r => r.id === roomId);
  if (selected) {
    localStorage.setItem('selectedRoom', JSON.stringify(selected));
    window.location.href = 'checkout.html';
  } else {
    alert('Room not found!');
  }
}

document.getElementById("booking-status-button").addEventListener("click", () => {
  window.location.href = "bookStat.html"; // Update to the correct filename if needed
});

document.getElementById('back-button')?.addEventListener('click', () => {
  window.location.href = 'home.html'; // Adjust to your actual filter page filename
});
