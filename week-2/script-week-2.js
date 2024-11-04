function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function showRemovedBackground() {
  document.getElementById("removed-background-image").style.display = "block";
  document.getElementById("original-image").style.display = "none";
  document.getElementById("reset-button").style.display = "block";
  document.getElementById("remove-button").style.display = "none";
}

function showOriginalBackground() {
  document.getElementById("removed-background-image").style.display = "none";
  document.getElementById("original-image").style.display = "block";
  document.getElementById("reset-button").style.display = "none";
  document.getElementById("remove-button").style.display = "block";
}