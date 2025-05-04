document.getElementById("check-in").addEventListener("click", () => {
    // Hide the Check In button
    document.getElementById("check-in").style.display = "none";
    
    // Show the message and the Back to Home button
    document.getElementById("check-in-message").style.display = "block";
});

document.getElementById("back-home").addEventListener("click", () => {
    // Redirect to the home page
    window.location.href = "home.html"; // Update with your home page URL
});
