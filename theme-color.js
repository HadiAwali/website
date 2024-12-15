// theme-color.js
window.addEventListener('DOMContentLoaded', (event) => {
    // Set theme color using JavaScript
    const themeColor = '#0000FF';  // Blue color
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = themeColor;

    // Append the new meta tag to the <head>
    document.head.appendChild(metaThemeColor);
});