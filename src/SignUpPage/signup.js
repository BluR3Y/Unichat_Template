var socket = io();

    var form = document.getElementById('createForm');
    var user_name = form.elements['username'];
    var user_email = form.elements['email'];
    var user_password = form.elements['pword'];

    var usernameErr = document.getElementsByClassName('errorMsg')[0];
    var emailErr = document.getElementsByClassName('errorMsg')[1];
    var pwordErr = document.getElementsByClassName('errorMsg')[2];
    var otherErr = document.getElementsByClassName('errorMsg')[3];

    form.addEventListener('submit', function(e){
        e.preventDefault();
        if(user_name.value.length > 2 && user_name.value.length < 31){
            if(validUsernameCharacters(user_name.value)){
                if(validEmail(user_email.value)){
                    if(user_password.value.length >= 6){
                        var formData = new FormData();
                        var xhr = new XMLHttpRequest();

                        formData.append("user_name", user_name.value);
                        formData.append("user_email", user_email.value);
                        formData.append("user_password", user_password.value);

                        xhr.open("POST", "/signupUser", true);
                        xhr.onreadystatechange = function() {
                            if(xhr.readyState === 4){
                                if(xhr.status === 200){
                                    var signupStatus = JSON.parse(xhr.responseText);
                                    if(signupStatus.status === "success"){
                                        window.location.href = "userCreated.html?userName="+user_name.value;
                                    }else{
                                        var failReason = signupStatus.reason;
                                        if(failReason === "creatingUser"){
                                            otherErr.textContent = "An error occured while creating your account";
                                            otherErr.style.opacity = '1';
                                        }else if(failReason === "takenEmail"){
                                            emailErr.textContent = "A user currently exists with that email";
                                            emailErr.style.opacity = '1';
                                        }else if(failReason === "takenUsername"){
                                            usernameErr.textContent = "Too many users currently exist with that username";
                                            usernameErr.style.opacity = '1';
                                        }
                                        else if(failReason === "dbConnection"){
                                            otherErr.textContent = "An error occured. Please try again later.";
                                            otherErr.style.opacity = '1';
                                            console.log('jello');
                                        }
                                    }
                                }else{
                                    console.log(xhr.statusText);
                                }
                            }
                        };
                        xhr.send(formData);
                        clearForm();
                    }else{
                        clearForm();
                        pwordErr.textContent = "Password must contain atleast 6 characters";
                        pwordErr.style.opacity = "1";
                    }
                }else{
                    clearForm();
                    emailErr.textContent = "Invalid Email";
                    emailErr.style.opacity = "1";
                }
            }else{
                clearForm();
                usernameErr.textContent = "Username contains invalid characters";
                usernameErr.style.opacity = "1";
            }
        }else{
                clearForm();
                usernameErr.textContent = "Username must be between 3 and 30 characters";
                usernameErr.style.opacity = "1";
        }
    });

    function validUsernameCharacters(username){
        var isvalid = true;
        for(var i=0; i < username.length;i++){
          if(!(/[0-9a-zA-Z]/).test(username[i])){
             isvalid = false;
          }
        }
        return isvalid;
    }

    function validEmail(email){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function clearForm(){
        user_password.value = "";
        usernameErr.textContent = "";
        usernameErr.style.opacity = "0";
        emailErr.textContent = "";
        emailErr.style.opacity = '0';
        pwordErr.textContent = "";
        pwordErr.style.opacity = '0';
        otherErr.textContent = "";
        otherErr.style.opacity = '0';
    }