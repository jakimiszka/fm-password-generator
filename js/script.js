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
        style.innerHTML += ".slider::-webkit-slider-thumb {background: white;} " :  //.slider{background: var(--grey-850);}
        style.innerHTML = ".slider::-webkit-slider-thumb {background: var(--white);}"; // .slider{background: var(--green-200);}
}

// prototype
function generatePassword() {
    const num = numbers_check.checked, 
          lett_upper = uppercase_check.checked, 
          symb = symbols_check.checked,
          lett_lower = lowercase_check.checked;
    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyz';       // lowercase - default
    const symbols = '!@#$%&*-+_=\"\'<>?:;[]{}()\\/<>,.|^~';
    let passwordLength = Number(slider.value);
    let password = "";

    // bug: if thers more than one checkbox selected and its last loopk 
    //      - pass len ll exceed limit
    while(passwordLength > 0) {
        const randomNumber = Math.floor(Math.random() * letters.length);
        password += letters[randomNumber];
        passwordLength -= 1;
        console.log('def:',passwordLength);
        if (num) {
            const randomNumber = Math.floor(Math.random() * numbers.length);
            password += numbers[randomNumber];
            passwordLength -= 1;
            console.log('num:',passwordLength);
        } 
        if(lett_lower){
            const randomNumber = Math.floor(Math.random() * letters.length);
            password += letters[randomNumber];
            passwordLength -= 1;
            console.log('lower:',passwordLength);
        }
        if (lett_upper) {
            const randomNumber = Math.floor(Math.random() * letters.length);
            password += letters[randomNumber].toLocaleUpperCase();
            passwordLength -= 1;
            console.log('upper:',passwordLength);
        } 
        if (symb) {
            const randomNumber = Math.floor(Math.random() * symbols.length);
            password += symbols[randomNumber];
            passwordLength -= 1;
            console.log('symb:',passwordLength);
        }
        
        console.log(passwordLength);
    }

    console.log('pass len',password.length);
    console.log(num, lett_lower, lett_upper, symb);
    password = password.split('').sort(() => Math.floor(Math.random() - 0.5)).join('');
    console.log('shuffeld: ', password )
} 

console.log(uppercase_check.checked)

slider.oninput = function() {
    const sliderValue = slider.value;
    setDefault(sliderValue);
    slider_value.innerHTML = sliderValue;
}
generate_button.addEventListener("click", generatePassword);


