function loadFunctions() {
  positionOther();
}

function positionOther() {
  let activities = document.getElementById("position-list");
  activities.addEventListener("change", e => {
    let option = e.target.value;
    let other = document.getElementsByClassName("other");
    if (option === "other") {
      other[0].classList.toggle("hidden");
    } else {
      if (!other[0].classList.contains("hidden")) {
        other[0].classList.toggle("hidden");
      }
    }
  });
}
