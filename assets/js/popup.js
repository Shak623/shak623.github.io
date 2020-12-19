var modalBtns = [...document.querySelectorAll(".open-popup")];
const header = document.getElementById("header");

modalBtns.forEach(function(btn){
    btn.onclick = function() {
        var modal = btn.getAttribute('data-modal');
        document.getElementById(modal).classList.add("active");
        document.body.classList.add("no-scroll");
        header.classList.add("hide");
    }
});

var closeBtns = [...document.querySelectorAll(".close-popup")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.popup-container');
    modal.classList.remove("active");
    document.body.classList.remove("no-scroll");
    header.classList.remove("hide");
  }
});

window.onclick = function(event) {
  if (event.target.className === "data-modal") {
    event.target.classList.remove("active");
    document.body.classList.remove("no-scroll");
    header.classList.remove("hide");
  }
}
