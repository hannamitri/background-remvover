function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

async function removeBackground(imageFile) {
  // Create a new FormData instance
  const data = new FormData();

  // Append the image file to the FormData
  data.append("image", imageFile);

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "34520805c8msh11e220055657d78p1c7976jsn2b13aff68bc2",
      "x-rapidapi-host": "ai-background-remover.p.rapidapi.com",
    },
    body: data,
  };

  try {
    const response = await fetch(
      "https://ai-background-remover.p.rapidapi.com/image/matte/v1",
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Failed to remove background: ${error.message}`);
  }
}

// Example usage in browser:
document
  .getElementById("fileInput")
  .addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const result = await removeBackground(file);
      console.log("Background removed successfully:", result);
      // Handle the result (e.g., display the processed image)
    } catch (error) {
      console.error("Failed to remove background:", error);
    }
  });
