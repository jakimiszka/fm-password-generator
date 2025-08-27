var slider = document.querySelector(".slider");
var style = document.querySelector('[data="test"]');
const generate_button = document.querySelector(".grid__generator--button_generate");

slider.oninput = function() {
    setDefault(slider.value);
}

function setDefault(x){
    Number(x) == 0 ?
        style.innerHTML += ".slider::-webkit-slider-thumb {background: white; }" :
        style.innerHTML = ".slider::-webkit-slider-thumb {background: var(--green-200); }"
}

function generatePassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&*";
    var passwordLength = slider.value;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars[randomNumber];
    }
    console.log(password);
}
generate_button.addEventListener("click", generatePassword);

