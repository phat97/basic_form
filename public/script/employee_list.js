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
    if (http.readyState === 4 && http.status === 200) {
      data = JSON.parse(http.responseText);
      console.log(data);
    }
  };
}
