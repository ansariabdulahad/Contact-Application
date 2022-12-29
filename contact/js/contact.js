/** Start Logout btn coding */

var username = sessionStorage.getItem("username");

// Code For Illegal Action performed.
if (username == null) {
    document.body.innerHTML = "<h1>404 Error ! <br> Page Not Found!</h1>"
    document.body.classList.add("illegal");

    setTimeout(() => {
        window.location = "../index.html";
    }, 2000);
}

// Code for logout btn.
var logout_btn = document.querySelector("#logout-btn");
logout_btn.onclick = function () {
    window.location = "../index.html";
    sessionStorage.removeItem("username");
}

/** End Logout btn coding */

/** Start Welcome msg heading Code */

var welcome_el = document.querySelector("#welcome");
var user_data = JSON.parse(localStorage.getItem(username));
welcome_el.innerHTML = "Welcome " + user_data.f_name + " " + user_data.l_name;

/** End Welcome msg heading Code */


// start contact list coding

var create_btn = document.querySelector(".create-btn");
var update_btn = document.querySelector(".update-btn");
var contact_detail = document.querySelector(".contact-details");
let input_name = document.querySelector(".name");
let input_number = document.querySelector(".number");

create_btn.onclick = function (e) {

    e.preventDefault();

    if (input_name.value != "" && input_number.value != "") {

        newContactApp();

        updateLocalStorage();
    }
    else {

        alert("Input Field Is Empty!");
    }
}

if (localStorage.getItem(username + "_list") != null) {

    var array_list = JSON.parse(localStorage.getItem(username + "_list"));

    array_list.forEach(task => {

        newContactApp(task);
    })
}

function newContactApp(task) {

    var i;
    let name = input_name.value;
    let number = input_number.value;

    if (task) {
        name = task.co_name;
        number = task.co_number;
    }

    var accordion = document.createElement("div");
    accordion.classList = "accordion mb-3";

    let all_accordions = contact_detail.getElementsByClassName("accordion");

    for (i = 0; i < all_accordions.length; i++) {

    }

    var accordion_item = document.createElement("div");
    accordion_item.classList = "accordion-item";

    accordion.append(accordion_item);

    var accordion_header = document.createElement("h5");
    accordion_header.classList = "accordion-header";

    accordion_item.append(accordion_header);

    var button = document.createElement("button");
    button.classList = "accordion-button";
    button.innerText = name;
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#collapse-" + i);

    accordion_header.append(button);

    var accordion_collapse = document.createElement("div");
    accordion_collapse.classList = "accordion-collapse collapse";
    accordion_collapse.id = "collapse-" + i;

    accordion_item.append(accordion_collapse);

    var accordion_body = document.createElement("div");
    accordion_body.classList = "accordion-body";

    accordion_collapse.append(accordion_body);

    var row = document.createElement("div");
    row.classList = "row";

    accordion_body.append(row);

    var col_one = document.createElement("div");
    col_one.classList = "col-md-6";

    row.append(col_one);

    var h5 = document.createElement("h5");
    h5.innerText = name;
    h5.id = "contact-" + i;

    col_one.append(h5);

    var p = document.createElement("p");
    p.innerText = number;

    col_one.append(p);

    var col_two = document.createElement("div");
    col_two.classList = "col-md-6 d-flex justify-content-around align-items-center position-relative";
    col_two.innerHTML = '<i class="fa-regular fa-message"></i><i class="fa-solid fa-square-phone"></i><i class="fa-solid fa-ellipsis-vertical op-btn"></i>';

    row.append(col_two);

    var option_box = document.createElement("div");
    option_box.classList = "option-box";
    option_box.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><i class="fa-regular fa-trash-can"></i>';

    col_two.append(option_box);

    contact_detail.append(accordion);

    input_name.value = "";
    input_number.value = "";


    // option box i tag coding

    var i_tag = option_box.getElementsByTagName("i");

    // start update coding

    i_tag[0].onclick = function () {

        var parent = this.parentElement.parentElement.parentElement;
        var h5 = parent.getElementsByTagName("h5");
        var p = parent.getElementsByTagName("p");

        var edited_name = h5[0].innerHTML;
        var edited_con = p[0].innerHTML;

        input_name.value = edited_name;
        input_number.value = edited_con;
        input_name.focus();

        create_btn.classList.add("d-none");
        update_btn.classList.remove("d-none");

        update_btn.onclick = function () {

            var id = h5[0].getAttribute("id").replace("contact-", "");
            var co_name = input_name.value;
            var co_number = input_number.value;

            updateLocalStorage(co_name, co_number, id);

            create_btn.classList.remove("d-none");
            update_btn.classList.add("d-none");

            input_name.value = "";
            input_number.value = "";
        }
    }


    // start delete coding

    i_tag[1].onclick = function () {

        var cnf = window.confirm("Are u sure !");

        if (cnf) {

            accordion.remove();

            updateLocalStorage(); // calling
        }
        else {
            alert("Your data is safe !");
        }
    }


    // start option box coding

    var op_btn = document.querySelectorAll(".op-btn");

    for (i = 0; i < op_btn.length; i++) {

        op_btn[i].onclick = function () {

            var parent = this.parentElement;
            var op_box = parent.querySelector(".option-box");

            op_box.classList.toggle("active");
        }
    }
}

// update local storage function coding

function updateLocalStorage(name, number, id) {

    if (name != "" && number != "") {

        array_list[id] = {

            co_name: name,
            co_number: number
        }
    }
    else {

        var i;
        array_list = [];
        var accordion_el = contact_detail.querySelectorAll(".accordion");

        for (i = 0; i < accordion_el.length; i++) {

            let h5 = accordion_el[i].getElementsByTagName("h5");
            let p = accordion_el[i].getElementsByTagName("p");

            array_list.push({

                co_name: h5[1].innerHTML,
                co_number: p[0].innerHTML
            });
        }
    }

    localStorage.setItem(username + "_list", JSON.stringify(array_list));
}


// start search coding

function mySearch() {

    var i, btn, textValue;
    var input = document.querySelector("#search").value;
    var filter = input.toUpperCase();
    var accordion = contact_detail.querySelectorAll(".accordion");

    for (i = 0; i < accordion.length; i++) {

        btn = accordion[i].getElementsByTagName("button")[0];
        textValue = btn.innerText;

        if (textValue.toUpperCase().indexOf(filter) > -1) {

            accordion[i].style.display = "";
        }
        else {

            accordion[i].style.display = "none";
        }
    }
}