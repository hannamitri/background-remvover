function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

const fileInput = document.getElementById("fileInput");
const imageButtons = document.getElementById("image-buttons");
const resetButton = document.getElementById("reset-button");
const downloadButton = document.getElementById("download-button");

async function uploadTextToSpeech() {
  const inputText = document.getElementById("fileInput").value;
  if (!inputText) {
    alert("Please enter text before submitting.");
    return;
  }

  console.log("inputText:", inputText);

  const url = "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "34520805c8msh11e220055657d78p1c7976jsn2b13aff68bc2",
      "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: "Dog in a park",
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

resetButton.addEventListener("click", () => {
  imageButtons.style.display = "none";
});

downloadButton.addEventListener("click", () => {});
