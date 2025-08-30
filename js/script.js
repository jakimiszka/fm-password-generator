const slider = document.querySelector(".slider");
const style = document.querySelector('[data="test"]');
const generate_button = document.querySelector(".grid__generator--button_generate");
const slider_value = document.querySelector(".grid__generator--slider--input_value");
const uppercase_check = document.querySelector("#uppercase");
const lowercase_check = document.querySelector("#lowercase");
const numbers_check = document.querySelector("#numbers");
const symbols_check = document.querySelector("#symbols");
const strength_level = document.querySelector(".strength_level");
const copy_button = document.querySelector('.copy_button');
const password_value = document.querySelector(".grid__password--input_text");
const numbers = '0123456789',
      letters = 'abcdefghijklmnopqrstuvwxyz',
      symbols = '!@#$%&*+_=\"\'<>?:;[]{}()\\/<>,.|^~';
const options = {
    'numbers': numbers,
    'letters': letters,
    'symbols': symbols,
    'all_chars': numbers + letters + symbols
}
const strength = {
    '1': 'yellow',
    '2': 'orange',
    '3': 'blue',
    '4': 'red'
}
const strengthLevel = {
    '1': 'VERY WEAK',
    '2': 'WEAK',
    '3': 'MEDIUM',
    '4': 'STRONG'
}

function getRandomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
}

function recursivePassword(length, charSets, result = "") {
    // Base case: if length is 0, return result
    if (length === 0) return result;

    // If result is shorter than charSets.length, guarantee one from each set
    if (result.length < charSets.length) {
        return recursivePassword(length - 1, charSets, result + getRandomChar(charSets[result.length]));
    } else {
        // After guaranteeing, pick randomly from all selected sets
        const all = charSets.join('');
        return recursivePassword(length - 1, charSets, result + getRandomChar(all));
    }
}

function generatePassword(){
    let password = '';
    const passwordLength = Number(slider.value);
    const charSets = getcharSets();

    if (passwordLength === 0) return '';
    if (charSets.length === 0) {
        // No options selected, use all chars
        for(let i = 0; i < passwordLength; i++){
            password += getRandomChar(options.all_chars);
        }
        return password;
    }
    if (passwordLength < charSets.length) {
        // Not enough length to guarantee all options
        return '';
    }
    
    password = recursivePassword(passwordLength, charSets);

    passwordStrength(password, charSets.length);

    return password;
}

function passwordStrength(password, charSetsLength){
    const strengthLi = document.querySelectorAll('ul > li');
    // default
    strengthLi.forEach((li) => {
        li.style.backgroundColor = 'var(--grey-850)';
        li.style.borderColor = 'white';
    })

    const valuePasswordStrength = (password, charSetsLength) =>{
        const passwordLength = password.length;
        if(passwordLength >= 8 && charSetsLength === 4){
            return 4;
        }else if(passwordLength >= 8 && charSetsLength === 3){
            return 3;
        }else if(passwordLength >= 10 && charSetsLength === 2){
            return 2;
        }else if(passwordLength >= 10 && charSetsLength === 1){
            return 1;
        }
    }
    const strengthValue = valuePasswordStrength(password, charSetsLength);
    for(let i=0; i< strengthValue; i++){
        const strengthElement = document.querySelector(`ul > li:nth-child(${i+1})`);
        strengthElement.style.backgroundColor = strength[strengthValue];
        strengthElement.style.borderColor = strength[strengthValue];
    }
    strengthLevel[strengthValue] ? strength_level.innerHTML = strengthLevel[strengthValue] : strength_level.innerHTML = '';
}

function checkIfButtonDisabled(){
    const charSets = getcharSets();
    if(Number(slider.value) > 0 && slider.value <= charSets.length || Number(slider.value) == 0 || charSets.length == 0){
        generate_button.classList.add('disabled'); 
        generate_button.disabled = true;
    }else{
        generate_button.disabled = false;
        generate_button.classList.remove('disabled');
    }
}

function getcharSets(){
    const charSets = [];
    if (uppercase_check.checked) charSets.push(options.letters.toUpperCase());
    if (lowercase_check.checked) charSets.push(options.letters);
    if (numbers_check.checked) charSets.push(options.numbers);
    if (symbols_check.checked) charSets.push(options.symbols);

    return charSets;
}

checkIfButtonDisabled();

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => 
    checkbox.addEventListener('change', () => {
        checkIfButtonDisabled();
}));

slider.oninput = function() {
    const sliderValue = slider.value;
    slider_value.innerHTML = sliderValue;
    checkIfButtonDisabled()
}

generate_button.addEventListener("click", () =>{
    const password = generatePassword();
    password_value.innerHTML = password;
});

copy_button.addEventListener('click', () => {
    const pass = password_value.innerHTML;
    navigator.clipboard.writeText(pass);
}); 