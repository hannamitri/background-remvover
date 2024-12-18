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
  "Books are portable and so they are easy to carry around. They can be read at any time night or day, while travelling on a bus or train or flight, and at meal time too. Books are published in many languages and in varied genres. Every book title has an International Standard Book Number (ISBN) that is unique to it."
  const url =
    "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "34520805c8msh11e220055657d78p1c7976jsn2b13aff68bc2",
      "x-rapidapi-host": "tldrthis.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: inputText,
      min_length: 100,
      max_length: 300,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.summary);
  } catch (error) {
    console.error("Error:", error);
  }
}

resetButton.addEventListener("click", () => {
  imageButtons.style.display = "none";
});

downloadButton.addEventListener("click", () => {});
