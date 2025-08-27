const slider = document.querySelector(".slider");
const style = document.querySelector('[data="test"]');
const generate_button = document.querySelector(".grid__generator--button_generate");

slider.oninput = function() {
    setDefault(slider.value);
}

function setDefault(x){
    Number(x) == 0 ?
        style.innerHTML += ".slider::-webkit-slider-thumb {background: white; }" :
        style.innerHTML = ".slider::-webkit-slider-thumb {background: var(--green-200); }"
}

// prototype
function generatePassword() {
    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%&*';
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&*";
    const passwordLength = slider.value;
    let password = "";
    for (var i = 0; i <= passwordLength; i++) {
        // get length basen od checked boxes
            // get random number for each category
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars[randomNumber];
    }
    console.log(password);
}

generate_button.addEventListener("click", generatePassword);

