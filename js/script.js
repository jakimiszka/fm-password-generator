const slider = document.querySelector(".slider");
const style = document.querySelector('[data="test"]');
const generate_button = document.querySelector(".grid__generator--button_generate");
const slider_value = document.querySelector(".grid__generator--slider--input_value");
const uppercase_check = document.querySelector("#uppercase");
const lowercase_check = document.querySelector("#lowercase");
const numbers_check = document.querySelector("#numbers");
const symbols_check = document.querySelector("#symbols");
const numbers = '0123456789',
      letters = 'abcdefghijklmnopqrstuvwxyz',
      symbols = '!@#$%&*-+_=\"\'<>?:;[]{}()\\/<>,.|^~';
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
    const charSets = [];
    if (uppercase_check.checked) charSets.push(options.letters.toUpperCase());
    if (lowercase_check.checked) charSets.push(options.letters);
    if (numbers_check.checked) charSets.push(options.numbers);
    if (symbols_check.checked) charSets.push(options.symbols);

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
        li.style.borderColor = 'var(--white)';
    })
    // options selected
    const color = strength[charSetsLength];
    for(let i=0; i< charSetsLength; i++){
        const strengthElement = document.querySelector(`ul > li:nth-child(${i+1})`);
        strengthElement.style.backgroundColor = color;
        strengthElement.style.borderColor = color;
    }

    // cases
        // 1. case len per easch set
            // lowercase == 8 -> Strong
            // uppercase == 8 -> Strong
            // numbers == 10 -> medium
            // symbols == 8 -> medium   
        // 2. mixed sets (2, 3) and length
            
        // 3. all sets and length

    // 1. min length 6
        // all checked - VERY STRONG
}

slider.oninput = function() {
    const sliderValue = slider.value;
    slider_value.innerHTML = sliderValue;
}
generate_button.addEventListener("click", () =>{
    const password = generatePassword();
    console.log('password: ',password);
    console.log('password len: ', password.length);
});


