var lActive = document.getElementById("l-active-btn");
var sActive = document.getElementById("s-active-btn");
var l_active_el = document.querySelector(".l-active");
var s_active_el = document.querySelector(".s-active");

// On click event on sign up btn.

sActive.onclick = function() {
    s_active_el.style.opacity = "0";
    s_active_el.classList = "animate__animated animate__fadeOutUp active-box s-active"; 

    l_active_el.style.opacity = "1";
    l_active_el.style.zIndex = "1";
    l_active_el.classList = "animate__animated animate__fadeInDown active-box l-active";
}

// On click event on sign in btn.

lActive.onclick = function() {
    l_active_el.style.opacity = "0";
    l_active_el.classList = "animate__animated animate__fadeOutUp active-box l-active";

    s_active_el.style.opacity = "1";
    s_active_el.style.zIndex = "1";
    s_active_el.classList = "animate__animated animate__fadeInDown active-box s-active";
}


// start signup coding.

var signup_btn = document.querySelector(".signup-btn");
var f_name = document.getElementById("f-name");
var l_name = document.querySelector("#l-name");
var s_username = document.querySelector("#s-username");
var s_password = document.querySelector("#s-password");
var s_notice = document.querySelector("#s-notice");

// add event on signup btn.

signup_btn.onclick = function(e) {
    e.preventDefault();   // exception (optional use when page is not working or get loaded on click)


    // get signup data in the form of object with if condition.

    if(f_name.value != "" || l_name.value != "" || s_username.value != "" || s_password.value != "") 
    {
        // get local storage.
        if(localStorage.getItem(s_username.value) == null) 
        {
            // show data if data is not present.
            var data = {
                f_name : f_name.value,
                l_name : l_name.value,
                s_username : s_username.value,
                s_password : s_password.value
            };

            // convert object in string using json stringify method.
            var s_string = JSON.stringify(data);
            localStorage.setItem(s_username.value, s_string);

            // give notice of signup succes.
            s_notice.innerHTML = "SignUp Success !";
            s_notice.style.color = "green";
            
            // remove success msg after 3 second.
            setTimeout(() => {
                s_notice.innerHTML = "";
            }, 3000);

            // if signup page is success then remove all the fill information.
            f_name.value = "";
            l_name.value = "";
            s_username.value = "";
            s_password.value = "";
        }
        else {
            // give notice if username is exist already.
            s_notice.innerHTML = "Username is already exist !";
            s_notice.style.color = "red";
            setTimeout(() => {
                s_notice.innerHTML = "";
            }, 3000);
        }
    }
    else {
        // give notice if the requirement is empty.
        s_notice.innerHTML = "Input field is empty !";
        s_notice.style.color = "red";

        // set timeout to remove notice after 3 second.
        setTimeout(function() {
            s_notice.innerHTML = "";
        }, 3000);
    }
}



// start Login coding.

var login_btn = document.querySelector("#login-btn");
var username_el = document.querySelector("#username");
var password_el = document.querySelector("#password");
var l_notice = document.querySelector("#l-notice");


// add on click event on login btn.

login_btn.onclick = function(event) {
    event.preventDefault();

    // check data is emty?

    if(username_el.value != "" || password_el.value != ""){
        // check local storage.
        if(localStorage.getItem(username_el.value) != null) {
            
            // get password to match the data.
            var data = localStorage.getItem(username_el.value);
            var l_obj = JSON.parse(data); // conver string in object.
            var password = l_obj.s_password; // get password from the local storage.

            // now match the password to login from the local storage.
            if(password_el.value == password) {
                
                // attach contact file.
                window.location = "./contact/contact.html";
                sessionStorage.setItem("username", username_el.value);

                // clear input fields after login.
                username_el.value = "";
                password_el.value = "";
            }
            else {
                // give notice if password is wrong.
                l_notice.innerHTML = "Password is invalid !";
                l_notice.style.color = "red";

                // remove notice after 3 second.
                setTimeout(() => {
                    l_notice.innerHTML = "";
                }, 3000);
            }
        }
        else {
            // give notice if user name not exist in local storage.
            l_notice.innerHTML = "Username is invalid !";
            l_notice.style.color = "red";

            // remove msg after 3 second.
            setTimeout(() => {
                l_notice.innerHTML = "";
                // empty the username and password field
                username_el.value = "";
                password_el.value = "";
            }, 3000);
        }
    } 
    else {
        // give notice if the requirement is empty.
        l_notice.innerHTML = "Input Field Is Empty !";
        l_notice.style.color = "red";

        // set timeout to remove notice after 3 second.
        setTimeout(() => {
            l_notice.innerHTML = "";
        }, 3000);
    }
}