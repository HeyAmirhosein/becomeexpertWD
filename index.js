const imageContainerEl = document.querySelector(".image-container");
const imageLimitInput = document.querySelector("#imageLimit");
const applySettingsBtn = document.querySelector("#applySettings");
const resetSettingsBtn = document.querySelector("#resetSettings");
const btnEl = document.querySelector("#showMore");
let limit = 0;
let count = 0;

// Apply Settings
applySettingsBtn.addEventListener("click", () => {
  const userLimit = parseInt(imageLimitInput.value, 10);

  // Check if input is a valid number and within the limit (1-100) and length is not exceeded
  if (isNaN(userLimit) || userLimit < 1 || userLimit > 100) {
    alert("Please enter a valid number between 1 and 100.");
  } else {
    limit = userLimit;
    localStorage.setItem("imageLimit", limit);
    alert(`Settings applied: Image limit set to ${limit}`);
    loadImages(limit); // Load images after applying settings
  }
});

// Reset Settings
resetSettingsBtn.addEventListener("click", () => {
  localStorage.removeItem("imageLimit");
  imageLimitInput.value = "1";
  limit = 0;
  count = 0;
  imageContainerEl.innerHTML = ""; // Clear images on reset
  alert("Settings reset.");
});

// Show More Button
btnEl.addEventListener("click", () => {
  if (limit === 0) {
    alert("Please apply valid settings first.");
    return;
  }
  if (count < limit) {
    addNewImages(2);
  } else {
    alert("Image limit reached!");
  }
});

// Add New Images
function addNewImages(imageNum) {
  for (let i = 0; i < imageNum; i++) {
    if (count >= limit) break;
    const randomNumber = Math.floor(Math.random() * 2000);
    const imgEl = document.createElement("img");
    imgEl.src = `https://picsum.photos/300?random=${randomNumber}`;
    imageContainerEl.appendChild(imgEl);
    count++;
  }
}

// Load images based on the limit
function loadImages(imageNum) {
  imageContainerEl.innerHTML = ""; // Clear the container before loading new images
  count = 0; // Reset count when loading new images
  for (let i = 0; i < imageNum; i++) {
    addNewImages(1);
  }
}

// Initialize Settings from Local Storage
window.addEventListener("load", () => {
  const storedLimit = localStorage.getItem("imageLimit");
  if (storedLimit) {
    limit = parseInt(storedLimit, 10);
    imageLimitInput.value = limit;
  }
});

// function setSize(checked){
//   const width = document.getElementById('imageWidth')
//   const height = document.getElementById('imageHeight')
//   if(checked){
//     width.disabled = false;
//     height.disabled = false;
//   }else{
//     width.disabled = true;
//     width.value = 300;
//     height.disabled = true;
//     height.disabled = 300;
//   }
// }
