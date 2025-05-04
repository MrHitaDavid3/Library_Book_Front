// Handle Login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('login-id').value;
  const pin = document.getElementById('login-pin').value;

  // Check hardcoded users first
  if (id === "testuser" && pin === "1234") {
    localStorage.setItem('currentUser', JSON.stringify({ id: "testuser", email: "testuser@sjsu.edu" }));
    window.location.href = "home.html";
  } else if (id === "testadmin" && pin === "4321") {
    localStorage.setItem('currentUser', JSON.stringify({ id: "testadmin", email: "testadmin@sjsu.edu" }));
    window.location.href = "AdminHub.html";
  } else if (id === "banUser" && pin === "3333") {
    localStorage.setItem('currentUser', JSON.stringify({ id: "banUser", email: "banUser@sjsu.edu" }));
    window.location.href = "suspend.html";
  } else {
    // Check registered users in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(user => 
      user.id === id &&
      user.pin === pin &&
      user.email.endsWith("@sjsu.edu")
    );

    if (found) {
      // Check if the user is suspended
      const suspensionRequests = JSON.parse(localStorage.getItem('suspensionRequests')) || [];
      const suspendedUser = suspensionRequests.find(request => request.id === found.id && request.status === 'suspended');
      
      if (suspendedUser) {
        alert("Your account is currently suspended. Please contact support.");
        return; // Prevent login
      }

      // Check for missed bookings
      const allBookings = JSON.parse(localStorage.getItem('bookingHistory')) || [];
      const missedBookingsCount = allBookings.filter(b =>
        b.email === found.email && b.status === "missed"
      ).length;

      if (missedBookingsCount >= 3) {
        found.banned = true; // Mark the user as banned
        localStorage.setItem('currentUser', JSON.stringify(found)); // Save the banned status
        alert("Your account is suspended due to 3 missed bookings. Please contact support.");
        window.location.href = "suspend.html"; // Redirect to the suspended page
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(found));
      window.location.href = "home.html";
    } else {
      alert("Invalid ID, PIN, or email domain.");
    }
  }
});

// Signup handler
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('signup-id').value;
  const pin = document.getElementById('signup-pin').value;
  const email = document.getElementById('signup-email').value;
  const pass = document.getElementById('signup-pass').value;
  const confirm = document.getElementById('signup-confirm').value;
  const agree = document.getElementById('agree-terms').checked;

  console.log("Sign-up form submitted");
  console.log("ID:", id, "PIN:", pin, "Email:", email, "Pass:", pass, "Confirm:", confirm, "Agree:", agree);

  // Validation checks
  if (!agree) {
    alert("You must agree to the terms.");
    return;
  }

  if (!email.endsWith("@sjsu.edu")) {
    alert("Only SJSU email addresses are allowed.");
    return;
  }

  if (pass !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  // Load existing users or start new list
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Existing users:", users);

  // Prevent duplicate ID or email
  if (users.some(user => user.id === id || user.email === email)) {
    alert("A user with this ID or email already exists.");
    return;
  }

  // Save new user
  const user = { id, pin, email, password: pass, banned: false }; // Add 'banned' flag
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  console.log("New user added:", user);
  alert("Account created! You can now log in.");
  document.getElementById('signupForm').reset();
  document.getElementById('show-login').click();
});

// Toggle between login and signup forms
document.getElementById('show-signup').addEventListener('click', function() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('signup-section').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
  document.getElementById('signup-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
});
