const register = document.getElementById('register');
const email = document.getElementById('email');
const password = document.querySelector('#password'); // # là id, . là class

const lowerCase = /[a-z]/g; //Regex
const upperCase = /[A-Z]/g; //Thiếu dấu ngoặc vuông
const number = /[0-9]/g;
const trueEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function Redirect() {
    window.location="../login/login.html";
 }

register.addEventListener('submit',(e) => {
    e.preventDefault();

    //Validate Email and Password
    if(email.value.trim().length == 0 && password.value.trim().length == 0){
        alert('Please input email and password');
    } else if (email.value.trim().length == 0) {
        alert('Please input email');
    } else if (password.value.trim().length == 0) {
        alert('Please input password');
    } else if (password.value.trim().length < 8) {
        alert('Password must be at least 8 chars');
    } else if (!email.value.trim().match(trueEmail)) {
        alert('Email is invalid');
    } else if (!password.value.trim().match(upperCase)) {
        alert('Password must contain an upper case letter');
    } else if (!password.value.trim().match(lowerCase)) {
        alert('Password must contain a lower case letter');
    } else if (!password.value.trim().match(number)) {
        alert('Password must contain number');
    } else {
        if(!localStorage.users){
            localStorage.setItem('users',JSON.stringify([
                {
                    email: email.value,
                    password: password.value,
                }
            ]))
        } else {
             let users = JSON.parse(localStorage.getItem('users'));
             users.push({
                email: email.value,
                password: password.value
             })
             localStorage.setItem('users',JSON.stringify(users));
        }
        alert('Register done')
        document.write("You will be redirected to login page in 10 sec.");
        setTimeout('Redirect()', 10000);
    }
})