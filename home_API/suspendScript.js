document.getElementById('reinstatement-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const reason = document.getElementById('reason').value;

  const suspensionRequests = JSON.parse(localStorage.getItem('suspensionRequests')) || [];

  // Check if this user already has a request
  let existing = suspensionRequests.find(req => req.email === email);
  if (existing) {
    existing.reason = reason;
    existing.fullName = fullName;
    existing.count = (existing.count || 1) + 1;
    existing.id = new Date().getTime();  // Update ID to latest request
  } else {
    suspensionRequests.push({
      fullName,
      email,
      reason,
      id: new Date().getTime(),
      count: 1
    });
  }

  localStorage.setItem('suspensionRequests', JSON.stringify(suspensionRequests));

  // Hide form and show success message
  document.getElementById('reinstatement-form').style.display = 'none';
  document.getElementById('success-message').style.display = 'block';
});


// Back/logout button before submission
document.getElementById('back-button')?.addEventListener('click', () => {
  window.location.href = 'logIn.html';  // Replace with your logout or landing page
});

// Logout button after submission
document.getElementById('logout-button')?.addEventListener('click', () => {
  window.location.href = 'logIn.html';  // Replace as needed
});
