/* 
Typing Effect Script
This types one letter at a time inside #typing.
You can edit the text inside "textToType" to change the animation.
*/

const textToType = "Front-End Developer | Android Developer | UI Designer";

let index = 0;
const typingElement = document.getElementById("typing");

function typeText() {
    if (index < textToType.length) {
        typingElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeText, 50);  // Speed of typing
    }
}

typeText();
