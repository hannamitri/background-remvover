const fileInput = document.getElementById("fileInput");
const imageButtons = document.getElementById("image-buttons");
const resetButton = document.getElementById("reset-button");
const downloadButton = document.getElementById("download-button");
const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loading-spinner");
const submitButton = document.getElementById("submit-button");
const dropArea = document.getElementById("drop-area");

submitButton.addEventListener("click", handleTextSubmission);

function handleTextSubmission() {
  const inputText = fileInput.value.trim();
  if (!inputText) {
    alert("Please enter text before submitting.");
    return;
  }

  imageContainer.style.opacity = 0.4;
  dropArea.style.display = "none";
  loadingSpinner.style.display = "flex";
  imageButtons.style.display = "none";

  // Simulate text-to-speech processing
  // mockUploadTextToSpeech(inputText);
  uploadTextToSpeech(inputText);
}

async function uploadTextToSpeech() {
  const inputText = document.getElementById("fileInput").value;
  if (!inputText) {
    alert("Please enter text before submitting.");
    return;
  }

  console.log("inputText:", inputText);

  // const url = "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic";
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "x-rapidapi-key": "34520805c8msh11e220055657d78p1c7976jsn2b13aff68bc2",
  //     "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     inputs: inputText,
  //   })
  // };

  const url =
    "https://us-central1-frontend-simplified.cloudfunctions.net/backgroundRemover";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: inputText,
      apiKey: "HDh83f8HDHUDIdh8d8d",
    }),
  };

  const res = await fetch(url, options);
  const result = await res.json();
  console.log(result);

  try {
    // const response = await fetch(url, options);
    // const result = await response.json();
    // console.log(result.url);

    imageButtons.style.display = "flex";
    imageContainer.style.opacity = 1;
    loadingSpinner.style.display = "none";

    const processedImg = document.createElement("img");
    processedImg.src = result;
    processedImg.alt = "Processed Image";
    processedImg.style.maxWidth = "100%";
    processedImg.style.maxHeight = "400px";

    imageContainer.innerHTML = "";
    imageContainer.appendChild(processedImg);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function mockUploadTextToSpeech(inputText) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  loadingSpinner.style.display = "none";
  imageContainer.style.opacity = 1;
  imageButtons.style.display = "flex";

  const processedImg = document.createElement("img");
  processedImg.src =
    "https://i.ibb.co/0246pVw/pexels-jose-almeida-999955-2649841-removebg-preview.png";
  processedImg.alt = "Processed Image";
  processedImg.style.maxWidth = "100%";
  processedImg.style.maxHeight = "400px";

  imageContainer.innerHTML = "";
  imageContainer.appendChild(processedImg);
}

resetButton.addEventListener("click", () => {
  imageContainer.innerHTML = "";
  imageButtons.style.display = "none";
  fileInput.value = "";
  loadingSpinner.style.display = "none";
  imageContainer.style.opacity = 1;
  dropArea.style.display = "flex";
});

downloadButton.addEventListener("click", () => {
  const processedImg = imageContainer.querySelector("img");
  if (processedImg) {
    const link = document.createElement("a");
    link.href = processedImg.src;
    link.download = "processed-image.png";
    link.click();
  }
});

// const fileInput = document.getElementById("fileInput");
// const imageButtons = document.getElementById("image-buttons");
// const resetButton = document.getElementById("reset-button");
// const downloadButton = document.getElementById("download-button");
// const imageContainer = document.getElementById("image-container");
// const loadingSpinner = document.getElementById("loading-spinner");
// const submitButton = document.getElementById("submit-button");
// const dropArea = document.getElementById("drop-area");

// submitButton.addEventListener("click", handleTextSubmission);

// function handleTextSubmission() {
//   const inputText = fileInput.value.trim();
//   if (!inputText) {
//     alert("Please enter text before submitting.");
//     return;
//   }

//   imageContainer.style.opacity = 0.4;
//   dropArea.style.display = "none";
//   loadingSpinner.style.display = "flex";
//   imageButtons.style.display = "none";

//   // Simulate text-to-speech processing
//   // mockUploadTextToSpeech(inputText);

//   uploadTextToSpeech(inputText);
// }

// async function uploadTextToSpeech() {
//   const inputText = document.getElementById("fileInput").value;
//   if (!inputText) {
//     alert("Please enter text before submitting.");
//     return;
//   }

//   console.log("inputText:", inputText);

//   const url = "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic";
//   const options = {
//     method: "POST",
//     headers: {
//       "x-rapidapi-key": "34520805c8msh11e220055657d78p1c7976jsn2b13aff68bc2",
//       "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       inputs: inputText,
//     })
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log(result.url);

//     imageButtons.style.display = "flex";
//     imageContainer.style.opacity = 1;
//     loadingSpinner.style.display = "none";

//     const processedImg = document.createElement("img");
//     processedImg.src = result.url;
//     processedImg.alt = "Processed Image";
//     processedImg.style.maxWidth = "100%";
//     processedImg.style.maxHeight = "400px";

//     imageContainer.innerHTML = "";
//     imageContainer.appendChild(processedImg);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// async function mockUploadTextToSpeech(inputText) {
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   loadingSpinner.style.display = "none";
//   imageContainer.style.opacity = 1;
//   imageButtons.style.display = "flex";

//   const processedImg = document.createElement("img");
//   processedImg.src = "https://i.ibb.co/0246pVw/pexels-jose-almeida-999955-2649841-removebg-preview.png";
//   processedImg.alt = "Processed Image";
//   processedImg.style.maxWidth = "100%";
//   processedImg.style.maxHeight = "400px";

//   imageContainer.innerHTML = "";
//   imageContainer.appendChild(processedImg);
// }

// resetButton.addEventListener("click", () => {
//   imageContainer.innerHTML = "";
//   imageButtons.style.display = "none";
//   fileInput.value = "";
//   loadingSpinner.style.display = "none";
//   imageContainer.style.opacity = 1;
//   dropArea.style.display = "flex";
// });

// downloadButton.addEventListener("click", () => {
//   const processedImg = imageContainer.querySelector("img");
//   if (processedImg) {
//     const link = document.createElement("a");
//     link.href = processedImg.src;
//     link.download = "processed-image.png";
//     link.click();
//   }
// });
