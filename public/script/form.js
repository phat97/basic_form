function loadFunctions() {
  positionOther();
  todayDate();
  submitData();
}

function positionOther() {
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

function todayDate() {
  let today = new Date().toLocaleDateString("en-US");
  document.querySelector(".today").value = today;
}

function submitData() {
  let submit = document.querySelector("#submit");
  submit.addEventListener("click", e => {
    e.preventDefault();
    console.log("submit");
    if (validateFormData()) {
      console.log("Posting to database");
    } else {
      console.log("form invalid");
    }
  });
}

function validateFormData() {
  console.log("Validating");
  let fname = document.querySelector(".first-name");
  let lname = document.querySelector(".last-name");
  let phone_number = document.querySelector(".phone-number");
  let email = document.querySelector(".email");
  let position = document.querySelector("#position-list");
  let salary = document.querySelector(".salary");

  if (fname.value == "") {
    fname.style.backgroundColor = "#fff4f4";
    fname.style.borderColor = "red";
  } else {
    fname.style.backgroundColor = "inherit";
    fname.style.borderColor = "#bebebe";
  }
  console.log(fname.value);
  console.log(lname.value);
  console.log(phone_number.value);
  console.log(email.value);
  console.log(position.value);
  console.log(salary.value);

  if (!validateCurrency(salary.value)) {
    console.log("shit");
  }
  return false;
}

function validateCurrency(salary) {
  let pattern = /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/;
  if (pattern.test(salary)) {
    return true;
  } else {
    return false;
  }
}
