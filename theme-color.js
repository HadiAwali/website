window.addEventListener('DOMContentLoaded', function () {
    alert('JavaScript is working!'); // Will show a pop-up alert message when the script runs
    
    // Create a meta tag dynamically
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#0000FF';  // Blue color
    document.head.appendChild(metaThemeColor);

    // Show a toast message to confirm that the script is working
    showToast('JavaScript has successfully changed the theme color to blue!');
});

// Function to display a toast message
function showToast(message) {
    // Create a toast container
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '20px';
    toastContainer.style.left = '50%';
    toastContainer.style.transform = 'translateX(-50%)';
    toastContainer.style.padding = '10px 20px';
    toastContainer.style.backgroundColor = '#333';
    toastContainer.style.color = 'white';
    toastContainer.style.borderRadius = '5px';
    toastContainer.style.fontSize = '16px';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.opacity = '0';
    toastContainer.style.transition = 'opacity 0.5s ease';

    // Set the message
    toastContainer.textContent = message;

    // Append the toast to the body
    document.body.appendChild(toastContainer);

    // Show the toast by changing opacity
    setTimeout(function () {
        toastContainer.style.opacity = '1';
    }, 100);

    // Hide the toast after 3 seconds
    setTimeout(function () {
        toastContainer.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(toastContainer);
        }, 500);
    }, 3000);
}