function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

const removeButton = document.getElementById("remove-button");
const resetButton = document.getElementById("reset-button");
const imageContainer = document.getElementById("image-container");
const loadingText = document.getElementById("loading-text");

const imageUrl = "https://images.pexels.com/photos/6949535/pexels-photo-6949535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

removeButton.addEventListener("click", () => {
  loadingText.style.display = "block";
  removeButton.style.display = "none";
  uploadImage();
});

async function uploadImage() {
  const url = "https://background-removal4.p.rapidapi.com/v1/results?mode=fg-image";
  const data = new FormData();
  data.append("url", imageUrl);

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

    loadingText.style.display = "none";
    resetButton.style.display = "block";

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
    loadingText.style.display = "none";
    removeButton.style.display = "block";
  }
}

resetButton.addEventListener("click", () => {
  imageContainer.innerHTML = `
    <img
      src="${imageUrl}"
      alt="Original Image"
      id="original-image"
      style="max-width: 100%;"
    />
  `;
  resetButton.style.display = "none";
  removeButton.style.display = "block";
});
