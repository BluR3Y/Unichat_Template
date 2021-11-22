window.onload = function(){
    var url = new URL(window.location.href);
    var passedEmail = url.searchParams.get('email');
    if(passedEmail !== null){
        user_email.value = passedEmail;
    }
}

var socket = io();

var form = document.getElementsByClassName('LoginForm')[0];
var user_email = document.getElementById('user_email');
var user_password = document.getElementById('user_password');
var errorMsg = document.getElementById('errorMessage');

form.addEventListener('submit', function(e){
    e.preventDefault();
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    formData.append("user_email", user_email.value);
    formData.append("user_pword",user_password.value);

    xhr.open("POST", "/loginUser", true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var loginStatus = JSON.parse(xhr.responseText);
                if(loginStatus.status === "success"){
                    var userInfo = window.localStorage;
                    localStorage.setItem('user_id', loginStatus.user_id);
                    localStorage.setItem('user_name', loginStatus.user_name);
                    localStorage.setItem('user_tag', loginStatus.user_tag);
                    localStorage.setItem('user_img', loginStatus.user_img);
                    localStorage.setItem('user_email', loginStatus.user_email);
                    gotoHomePage();
                }else{
                    var reason = loginStatus.reason;
                    if(reason === "userDNE"){
                        errorMsg.textContent = "User Does Not Exist";
                        errorMsg.style.display = "block";
                    }else if(reason === "invalidPword"){
                        errorMsg.textContent = "Invalid Password";
                        errorMsg.style.display = "block";
                    }else if(reason === "maxAttempts"){
                        errorMsg.textContent = "Max Number of Attempts Reached";
                        errorMsg.style.display = "block";
                    }else if(reason === "dbConnection"){
                        errorMsg.textContent = "Failed to Connect to Database. Please try again.";
                        errorMsg.style.display = "block";
                    }
                }
            }else{
                console.log(xhr.statusText);
            }
        }
    };
    xhr.send(formData);
    clearForm();
});

function clearForm(){
    user_password.value = '';
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
}
