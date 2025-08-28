const slider = document.querySelector(".slider");
const style = document.querySelector('[data="test"]');
const generate_button = document.querySelector(".grid__generator--button_generate");
const slider_value = document.querySelector(".grid__generator--slider--input_value");

const uppercase_check = document.querySelector("#uppercase");
const lowercase_check = document.querySelector("#lowercase");
const numbers_check = document.querySelector("#numbers");
const symbols_check = document.querySelector("#symbols");

function setDefault(x){
    Number(x) == 0 ?
        style.innerHTML += ".slider::-webkit-slider-thumb {background: white;} .slider{background: var(--grey-850);}" :
        style.innerHTML = ".slider::-webkit-slider-thumb {background: var(--white);} .slider{background: var(--green-200);}"
}

// prototype
function generatePassword() {
    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%&*';
    let passwordLength = Number(slider.value);
    const   num = numbers_check.checked, 
            lett = lowercase_check.checked, 
            symb = symbols_check.checked;
    let password = "";
    
    for (var i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * letters.length);
        if (num) {
            const randomNumber = Math.floor(Math.random() * numbers.length);
            password += numbers[randomNumber];
            passwordLength -= 1;
        } 
        if (lett) {
            const randomNumber = Math.floor(Math.random() * letters.length);
            password += letters[randomNumber];
            passwordLength -= 1;
        } 
        if (symb) {
            const randomNumber = Math.floor(Math.random() * symbols.length);
            password += symbols[randomNumber];
            passwordLength -= 1;
        }
        password += letters[randomNumber];
        //passwordLength -= 1;
    }
    console.log(slider.value);
    console.log(password);
    console.log(num, lett, symb);
}

console.log(uppercase_check.checked)

slider.oninput = function() {
    const sliderValue = slider.value;
    setDefault(sliderValue);
    slider_value.innerHTML = sliderValue;
}
generate_button.addEventListener("click", generatePassword);


