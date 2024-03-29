/**
 * Run functions to add eventlisteners to elements when page loads
 */
function initFunction() {
  enableOtherOption();
  todayDate();
  submitData();
}

/**
 * If "other" option is selected, enable the text field available for user input
 */
function enableOtherOption() {
  let activities = document.querySelector("#position-list");
  activities.addEventListener("change", e => {
    let option = e.target.value;
    let other = document.querySelector(".other");
    if (option === "other") {
      other.classList.toggle("hidden");
    } else {
      if (!other.classList.contains("hidden")) {
        other.classList.toggle("hidden");
      }
    }
  });
}

/**
 * Display the current date in the hired date text field
 */
function todayDate() {
  let today = new Date().toLocaleDateString("en-US");
  document.querySelector(".today").value = today;
}

/**
 * Function to send form data to the backend to be added to the database
 */
function submitData() {
  let submit = document.querySelector("#submit");
  let http = new XMLHttpRequest();
  let url = "/api/form";
  let data = {};

  submit.addEventListener("click", e => {
    e.preventDefault();
    if ((data = validateFormData()) != null) {
      http.open("POST", url, true);
      http.setRequestHeader("Content-Type", "application/json");
      http.send(JSON.stringify(data));

      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
          snackbarNotification(true);
          resetForm();
          history.back();
        }
      };
    } else {
      snackbarNotification(false);
    }
  });
}

/**
 * Validate all the form inputs and return true if everything is successful
 *
 * @returns JSON object with data, else return null
 */
function validateFormData() {
  let error = false;
  let fname = document.querySelector(".first-name");
  let lname = document.querySelector(".last-name");
  let phone_number = document.querySelector(".phone-number");
  let email = document.querySelector(".email");
  let position = document.querySelector("#position-list");
  let other = document.querySelector(".other-position");
  let salary = document.querySelector(".salary");
  let hired_date = document.querySelector(".today");
  let data = {};

  if (fname.value == "") {
    displayError(fname);
    error = true;
  } else {
    resetBorderStyle(fname);
  }

  if (lname.value == "") {
    displayError(lname);
    error = true;
  } else {
    resetBorderStyle(lname);
  }

  if (!validatePhoneNumber(phone_number.value)) {
    displayError(phone_number);
    error = true;
  } else {
    resetBorderStyle(phone_number);
  }

  if (!ValidateEmail(email.value)) {
    displayError(email);
    error = true;
  } else {
    resetBorderStyle(email);
  }

  if (position.value === "empty") {
    displayError(position);
    error = true;
  } else if (position.value === "other" && other.value == "") {
    displayError(position);
    displayError(other);
    error = true;
  } else {
    resetBorderStyle(other);
    resetBorderStyle(position);
  }

  if (!validateCurrency(salary.value)) {
    displayError(salary);
    error = true;
  } else {
    resetBorderStyle(salary);
  }

  if (!validateDate(hired_date.value)) {
    displayError(hired_date);
    error = true;
  } else {
    resetBorderStyle(hired_date);
  }

  if (error) {
    return null;
  }

  data = {
    first_name: fname.value,
    last_name: lname.value,
    number: phone_number.value,
    email: email.value,
    position: position.value != "other" ? position.value : other.value,
    salary: salary.value,
    hired_date: hired_date.value
  };

  return data;
}

/**
 * Change the CSS of the text field to be red
 *
 * @param {HTML Element} element
 */
function displayError(element) {
  element.style.backgroundColor = "#fff4f4";
  element.style.borderColor = "red";
}

/**
 * Change the CSS of the text field back to the current style
 *
 * @param {HTML Element} element
 */
function resetBorderStyle(element) {
  element.style.backgroundColor = "inherit";
  element.style.borderColor = "#bebebe";
}

/**
 * Check if user input follows the valid format of
 * xxx.xxx.xxxx, xxx xxx xxxx, xxx-xxx-xxxx
 *
 * @param {String} number
 * @returns true if user input matches the correct format else return false
 */
function validatePhoneNumber(number) {
  let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return number.match(pattern);
}

/**
 * Check if user input follows the email format
 * example@email.ca
 *
 * @param {String} email
 * @returns true if user input matches the correct format else return false
 */
function ValidateEmail(email) {
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(pattern);
}

/**
 * Check if user input follows the currency format
 * $xxx.xx
 *
 * @param {String} salary
 * @returns true if user input matches the correct format else return false
 */
function validateCurrency(salary) {
  let pattern = /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/;
  return salary.match(pattern);
}

/**
 * Check if user input follows the date format
 * mm/dd/yyyy
 *
 * @param {String} date
 * @returns true if user input matches the correct format else return false
 */
function validateDate(date) {
  let pattern = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
  return date.match(pattern);
}

/**
 * Snackbar appears when user submits to indicate success or failure
 *
 * @param {Boolean} isSuccess
 */
function snackbarNotification(isSuccess) {
  let element = document.getElementById("snackbar");
  element.className = "show";
  if (isSuccess) {
    element.style.backgroundColor = "#e6ffe6";
    element.style.border = "1px solid green";
    element.innerHTML = "Successfully Added";
  } else {
    element.style.backgroundColor = "#fff4f4";
    element.style.border = "1px solid red";
    element.innerHTML = "Invalid Fields";
  }
  setTimeout(function() {
    element.className = element.className.replace("show", "");
  }, 3000);
}

/**
 * Clear out form values to default
 */
function resetForm() {
  document.querySelector(".first-name").value = "";
  document.querySelector(".last-name").value = "";
  document.querySelector(".phone-number").value = "";
  document.querySelector(".email").value = "";
  document.querySelector("#position-list").value = "empty";
  document.querySelector(".other-position").value = "";
  document.querySelector(".salary").value = "";
}
