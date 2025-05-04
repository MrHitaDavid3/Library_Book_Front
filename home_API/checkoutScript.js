// checkoutScript.js

const room = JSON.parse(localStorage.getItem('selectedRoom'));

if (!room) {
  // No room selected — show message and disable form
  document.querySelector('.checkout-container').innerHTML = `
    <h2>Confirm Your Booking</h2>
    <div style="background-color:#f8d7da; color:#721c24; padding: 12px; border-radius: 5px; font-weight: bold;">
      ⚠️ No room selected. Please go back and choose a room.
    </div>
  `;
} else {
  // Show selected room details
  document.getElementById('booking-details').innerHTML = `
    <p><strong>Room ID:</strong> ${room.id}</p>
    <p><strong>Capacity:</strong> ${room.capacity} people</p>
    <p><strong>Floor:</strong> ${room.floor}</p>
    <p><strong>Date:</strong> ${room.date}</p>
    <p><strong>Time:</strong> ${formatTo12Hour(room.from)} - ${formatTo12Hour(room.until)}</p>
  `;

  // Handle booking form submission
  document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const booking = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      group: document.getElementById('group').value.trim(),
      ...room,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save booking to localStorage history
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    history.push(booking);
    localStorage.setItem('bookingHistory', JSON.stringify(history));

    // Clear selected room
    localStorage.removeItem('selectedRoom');

    // Show success message
    const message = document.createElement('div');
    message.style.backgroundColor = '#d4edda';
    message.style.color = '#155724';
    message.style.padding = '12px';
    message.style.marginTop = '20px';
    message.style.borderRadius = '5px';
    message.style.fontWeight = 'bold';
    message.innerText = '✅ Booking confirmed!';
    document.querySelector('.checkout-container').appendChild(message);

    // Hide form and clear inputs
    document.getElementById('checkout-form').reset();
    document.getElementById('checkout-form').style.display = 'none';
  });
}

document.getElementById('back-button-filter')?.addEventListener('click', () => {
  window.location.href = 'roomFilter.html'; // Adjust to your actual filter page filename
});

document.getElementById('back-button-home')?.addEventListener('click', () => {
  window.location.href = 'home.html'; // Adjust to your actual filter page filename
});

function formatTo12Hour(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = ((hour + 11) % 12 + 1); // Converts 0-23 to 1-12
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}
