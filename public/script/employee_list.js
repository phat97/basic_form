function initFunction() {
  getEmployeeData();
}

function addEmployee() {
  location.replace("/form.html");
}

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
      table.classList.toggle("hidden");
      data = JSON.parse(http.responseText);
      console.log(data);

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
        salary.innerHTML = data[i].salary;
        date_hired.innerHTML = data[i].date_hired;
      }
    } else {
      message.classList.toggle("hidden");
    }
  };
}
