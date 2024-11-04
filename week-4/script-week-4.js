function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loading-spinner");
const resetButton = document.getElementById("reset-button");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(
    eventName,
    () => dropArea.classList.add("hover"),
    false
  );
});

["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(
    eventName,
    () => dropArea.classList.remove("hover"),
    false
  );
});

dropArea.addEventListener("drop", handleDrop, false);
dropArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", handleFiles);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles({ target: { files } });
}

function handleFiles(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
      return;
    }
    showOriginalImage(file);
    uploadImage(file);
  }
}

function showOriginalImage(file) {
  imageContainer.style.opacity = 0.4;
  loadingSpinner.style.display = "flex";
  dropArea.style.display = "none";

  const originalImg = document.createElement("img");
  originalImg.alt = "Original Image";
  originalImg.style.maxWidth = "100%";

  const reader = new FileReader();
  reader.onload = function (event) {
    originalImg.src = event.target.result;
    imageContainer.appendChild(originalImg);
  };
  reader.readAsDataURL(file);
}

async function uploadImage(file) {
  const url =
    "https://background-removal4.p.rapidapi.com/v1/results?mode=fg-image";
  const data = new FormData();
  data.append("image", file);

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "d0e5ce08c0msh3d48815283e3916p149b26jsna7d8edb11e4e",
      "x-rapidapi-host": "background-removal4.p.rapidapi.com",
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    resetButton.style.display = "block";
    imageContainer.style.opacity = 1;
    loadingSpinner.style.display = "none";

    const imageLink = result.results[0].entities[0].image;

    const processedImg = document.createElement("img");
    processedImg.src = `data:image/png;base64,${imageLink}`;
    processedImg.alt = "Processed Image";
    processedImg.style.maxWidth = "100%";

    imageContainer.innerHTML = "";
    imageContainer.appendChild(processedImg);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to remove the background. Please try again.");
    dropArea.style.display = "flex";
  }
}

resetButton.addEventListener("click", () => {
  imageContainer.innerHTML = "";
  resetButton.style.display = "none";
  dropArea.style.display = "flex";
});
