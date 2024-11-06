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

  const url = "https://open-ai-text-to-speech1.p.rapidapi.com/";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "34520805c8msh11e220055657d78p1c7976jsn2b13aff68bc2",
      "x-rapidapi-host": "open-ai-text-to-speech1.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1",
      input: inputText,
      voice: "alloy",
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(blob);

    const playButton = document.getElementById("playButton");
    playButton.style.display = "inline-block";
    playButton.onclick = () => {
      const audio = new Audio(audioUrl);
      audio.play();
    };

    const downloadButton = document.getElementById("downloadButton");
    downloadButton.href = audioUrl;
    downloadButton.download = "generated-speech.mp3";
    downloadButton.textContent = "Download Audio";
    downloadButton.style.display = "inline-block";
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to generate text-to-speech output. Please try again.");
  }
}

resetButton.addEventListener("click", () => {
  imageButtons.style.display = "none";
});

downloadButton.addEventListener("click", () => {});
