function validate(){
    var fullName = document.getElementById('full-name').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var fullNameRGEX = /^[A-Za-z]+([ A-Za-z]+)*/;
    var passwordRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/i;
    var emailRGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
    var fullNameResult = fullNameRGEX.test(fullName);
    var passwordResult = passwordRGEX.test(password);
    var emailResult = emailRGEX.test(email);
    if(fullNameResult === false)
    {
        alert('Please enter a valid name');
        return false;
    }

    if(passwordResult === false)
    {
        alert('Please enter a valid password');
        return false;
    }

    if(emailResult === false)
    {
        alert('Please enter a valid email');
        return false;
    }

    return true;
}