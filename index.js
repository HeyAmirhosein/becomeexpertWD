const imageContainerEl = document.querySelector(".image-container");
const imageLimitInput = document.querySelector("#imageLimit");
const blurRateInput = document.querySelector("#blurRate");
const grayScaleInput = document.querySelector("#grayScale");
const setSizeCheckbox = document.querySelector("#setSize");
const widthInput = document.querySelector("#imageWidth");
const heightInput = document.querySelector("#imageHeight");
const applySettingsBtn = document.querySelector("#applySettings");
const resetSettingsBtn = document.querySelector("#resetSettings");
const darkModeToggle = document.querySelector("#darkModeToggle");
let limit = 0;
let count = 0;

applySettingsBtn.addEventListener("click", () => {
  const userLimit = parseInt(imageLimitInput.value, 10);
  const blurRate = blurRateInput.value || 0;
  const isGrayScale = grayScaleInput.checked;
  const setSize = setSizeCheckbox.checked;
  const width = widthInput.value || 200;
  const height = heightInput.value || 300;

  if (isNaN(userLimit) || userLimit < 1 || userLimit > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  // Save settings to localStorage
  localStorage.setItem("imageLimit", userLimit);
  localStorage.setItem("blurRate", blurRate);
  localStorage.setItem("grayScale", isGrayScale);
  localStorage.setItem("setSize", setSize);
  localStorage.setItem("imageWidth", width);
  localStorage.setItem("imageHeight", height);

  limit = userLimit;
  imageContainerEl.innerHTML = "";
  count = 0;

  for (let i = 0; i < limit; i++) {
    const imgEl = document.createElement("img");
    const random = Math.random();
    let src = `https://picsum.photos/${width}/${height}?random=${random}`;
    if (blurRate > 0) src += `&blur=${blurRate}`;
    if (isGrayScale) src += `&grayscale`;

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image-wrapper");
    imageWrapper.style.width = `${width}px`;
    imageWrapper.style.height = `${height}px`;

    imgEl.src = src;
    imageWrapper.appendChild(imgEl);
    imageContainerEl.appendChild(imageWrapper);
    count++;
  }
});

resetSettingsBtn.addEventListener("click", () => {
  localStorage.clear();
  imageLimitInput.value = "";
  blurRateInput.value = "";
  grayScaleInput.checked = false;
  setSizeCheckbox.checked = false;
  widthInput.disabled = true;
  widthInput.value = "";
  heightInput.disabled = true;
  heightInput.value = "";
  imageContainerEl.innerHTML = "";
  limit = 0;
  count = 0;
  darkModeToggle.checked = false;
  document.body.classList.remove("dark-mode");
});

setSizeCheckbox.addEventListener("change", (e) => {
  const enabled = e.target.checked;
  widthInput.disabled = !enabled;
  heightInput.disabled = !enabled;
});

darkModeToggle.addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
  localStorage.setItem("darkMode", e.target.checked);
});

window.addEventListener("load", () => {
  const storedLimit = localStorage.getItem("imageLimit");
  const storedBlurRate = localStorage.getItem("blurRate");
  const storedGrayScale = localStorage.getItem("grayScale");
  const storedSetSize = localStorage.getItem("setSize");
  const storedWidth = localStorage.getItem("imageWidth");
  const storedHeight = localStorage.getItem("imageHeight");
  const storedDarkMode = localStorage.getItem("darkMode");

  if (storedLimit) imageLimitInput.value = storedLimit;
  if (storedBlurRate) blurRateInput.value = storedBlurRate;
  if (storedGrayScale === "true") grayScaleInput.checked = true;
  if (storedSetSize === "true") {
    setSizeCheckbox.checked = true;
    widthInput.disabled = false;
    heightInput.disabled = false;
  }
  if (storedWidth) widthInput.value = storedWidth;
  if (storedHeight) heightInput.value = storedHeight;
  if (storedDarkMode === "true") {
    darkModeToggle.checked = true;
    document.body.classList.add("dark-mode");
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
