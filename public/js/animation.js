const descLine = document.querySelector('.typewriter2');
const bioCursor = document.querySelector('.bio');

const description = "Calling all Food Truck Lovers."

const typingDelay = 100;
let descIndex = 0;

typeDesc = () => {
    if(descIndex < description.length) {
        if (!bioCursor.classList.contains('typing')) bioCursor.classList.add('typing');
        descLine.textContent += description.charAt(descIndex);
        descIndex++;
        setTimeout(typeDesc, typingDelay);
    }  else {
        bioCursor.classList.remove('typing');
        setTimeout(function() {
            bioCursor.classList.remove('cursorMini');
        }, typingDelay + 5000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeDesc, typingDelay + 1500);
})

