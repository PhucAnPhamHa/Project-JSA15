let login = document.getElementById('login');
login.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let users = JSON.parse(localStorage.users);

    let emailInp = document.getElementById('email');
    let pwInp =  document.getElementById('password');

    let check = users.map(index => index.email == emailInp.value.trim() && index.password == pwInp.value.trim())
    for ( i in users) {
        if (check[i] == true){
            window.location.href = "../index.html";
        } else{
            alert('Please input again');
        }
    }
})