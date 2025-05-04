const bookings = JSON.parse(localStorage.getItem('bookingHistory')) || [];
const suspensionRequests = JSON.parse(localStorage.getItem('suspensionRequests')) || [];

function displayBookings() {
  const bookingTable = document.getElementById('booking-table').getElementsByTagName('tbody')[0];
  bookingTable.innerHTML = '';

  if (bookings.length === 0) {
    const row = bookingTable.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 6;
    cell.textContent = 'No bookings available';
    return;
  }

  bookings.forEach(booking => {
    const row = bookingTable.insertRow();
    row.innerHTML = `
      <td>${booking.id}</td>
      <td>${booking.capacity} people</td>
      <td>${booking.date}</td>
      <td>${booking.from} - ${booking.until}</td>
      <td>${booking.name} (${booking.email})</td>
      <td><button class="remove" onclick="removeBooking(${booking.id})">Remove</button></td>
    `;
  });
}

function displaySuspensionRequests() {
  const suspensionTable = document.getElementById('suspension-table').getElementsByTagName('tbody')[0];
  suspensionTable.innerHTML = '';

  if (suspensionRequests.length === 0) {
    const row = suspensionTable.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 4;
    cell.textContent = 'No suspension requests available';
    return;
  }

  suspensionRequests.forEach(request => {
    const row = suspensionTable.insertRow();
    row.innerHTML = `
      <td>${request.fullName}</td>
      <td>${request.email}</td>
      <td>
        <strong>Reason:</strong> Failure to comply with community guidelines<br>
        <strong>Times Suspended:</strong> ${request.count || 1}
      </td>
      <td>
        <button class="view-letter" onclick="showLetter('${request.reason.replace(/'/g, "\\'")}')">View Letter</button>
        <button class="resolve" onclick="resolveRequest(${request.id}, '${request.email}')">Resolve</button>
      </td>
    `;
  });
}

function removeBooking(bookingId) {
  const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
  localStorage.setItem('bookingHistory', JSON.stringify(updatedBookings));
  location.reload();
}

function resolveRequest(requestId, email) {
  const updatedRequests = suspensionRequests.filter(request => request.id !== requestId);
  localStorage.setItem('suspensionRequests', JSON.stringify(updatedRequests));

  // Reset user's suspension count and missed booking counter when they are unsuspended
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userToResolve = users.find(user => user.email === email);
  if (userToResolve) {
    userToResolve.banned = false; // Mark user as not banned
    localStorage.setItem('users', JSON.stringify(users)); // Update users in localStorage
    alert(`User ${userToResolve.email} has been reinstated.`);
  }

  location.reload();
}

// Modal logic
function showLetter(reasonText) {
  const modal = document.getElementById('letter-modal');
  const content = document.getElementById('letter-content');
  content.textContent = reasonText;
  modal.style.display = 'block';
}

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('letter-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
  const modal = document.getElementById('letter-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

window.addEventListener('storage', function(event) {
  if (event.key === 'bookingHistory') displayBookings();
  if (event.key === 'suspensionRequests') displaySuspensionRequests();
});

displayBookings();
displaySuspensionRequests();

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.style.display = section.style.display === 'none' || section.style.display === '' ? 'block' : 'none';
}

document.getElementById("log-out").addEventListener("click", () => {
  window.location.href = "logIn.html";
});
