const rooms = [
  { id: 322, capacity: "8", floor: 3, date: "2025-05-26", from: "09:00", until: "12:00" }, // Monday
  { id: 324, capacity: "6", floor: 3, date: "2025-05-27", from: "09:00", until: "12:00" }, // Tuesday
  { id: 326, capacity: "6", floor: 3, date: "2025-05-28", from: "09:00", until: "12:00" }, // Wednesday
  { id: 390, capacity: "10", floor: 3, date: "2025-05-29", from: "09:00", until: "12:00" }, // Thursday
  { id: 392, capacity: "4", floor: 3, date: "2025-05-30", from: "09:00", until: "12:00" }, // Friday
  { id: 602, capacity: "6", floor: 8, date: "2025-05-31", from: "13:00", until: "17:00" }, // Saturday
  { id: 702, capacity: "10", floor: 6, date: "2025-06-01", from: "08:00", until: "12:00" }, // Sunday
];

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

document.getElementById("room-filter-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const roomSize = document.getElementById("room-size").value;
  const floor = document.getElementById("floor").value;
  const selectedDay = document.getElementById("day-of-week").value;
  const fromTime = document.getElementById("from-time").value;
  const untilTime = document.getElementById("until-time").value;

  let minCap = 1, maxCap = 99;
  if (roomSize === "1-4") [minCap, maxCap] = [1, 4];
  else if (roomSize === "5-8") [minCap, maxCap] = [5, 8];
  else if (roomSize === "9-12") [minCap, maxCap] = [9, 12];

  const filteredRooms = rooms.filter(room => {
    const cap = parseInt(room.capacity);
    const matchesSize = roomSize === "Any" || (cap >= minCap && cap <= maxCap);
    const matchesFloor = floor === "Any" || room.floor === parseInt(floor);

    const roomDay = new Date(room.date).toLocaleDateString('en-US', { weekday: 'long' });
    const matchesDate = roomDay === selectedDay;

    let matchesTime = true;
    if (fromTime && untilTime) {
      const userFrom = timeToMinutes(fromTime);
      const userUntil = timeToMinutes(untilTime);
      const roomFrom = timeToMinutes(room.from);
      const roomUntil = timeToMinutes(room.until);
      matchesTime = roomFrom < userUntil && roomUntil > userFrom;
    }

    return matchesSize && matchesFloor && matchesDate && matchesTime;
  });

  displayRooms(filteredRooms);
});

function displayRooms(rooms) {
  const resultsContainer = document.getElementById("room-results");
  resultsContainer.innerHTML = "";

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

function reserveRoom(roomId) {
  const selected = rooms.find(r => r.id === roomId);
  if (selected) {
    localStorage.setItem('selectedRoom', JSON.stringify(selected));
    window.location.href = 'autoCheck.html';
  } else {
    alert('Room not found!');
  }
}

document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "home.html";
});
