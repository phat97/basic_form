/**
 * Load functions when page loads
 */
function initFunction() {
  getEmployeeData();
}

/**
 * Retrieve data from the backend
 */
function getEmployeeData() {
  let http = new XMLHttpRequest();
  let url = "/api/data";
  let data;
  http.open("GET", url);
  http.send();

  http.onreadystatechange = () => {
    let table = document.querySelector(".employee-table");
    let message = document.querySelector(".empty-page");

    if (http.readyState === 4 && http.status === 200) {
      data = JSON.parse(http.responseText);
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        message.classList.toggle("hidden");
      } else {
        table.classList.toggle("hidden");
        populateTable(data);
      }
    } else {
      message.classList.toggle("hidden");
    }
  };
}

/**
 * Populate the table with employee information
 * @param {JSON} data
 */
function populateTable(data) {
  let table = document.querySelector(".employee-table");

  for (let i = 0; i < data.length; i++) {
    let row = table.insertRow(-1);

    let id = row.insertCell(0);
    let name = row.insertCell(1);
    let position = row.insertCell(2);
    let phone = row.insertCell(3);
    let email = row.insertCell(4);
    let salary = row.insertCell(5);
    let date_hired = row.insertCell(6);

    id.innerHTML = data[i].employee_id;
    name.innerHTML = `${data[i].first_name} ${data[i].last_name}`;
    position.innerHTML = data[i].position;
    phone.innerHTML = data[i].phone_number;
    email.innerHTML = data[i].email;
    salary.innerHTML = formatMoney(data[i].salary);
    date_hired.innerHTML = data[i].date_hired;
  }
}

/**
 * Format number into USD currency
 * @param {Integer} number
 */
function formatMoney(number) {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
