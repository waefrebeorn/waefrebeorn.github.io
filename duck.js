// Base64 data for the duck images
const duckOpen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAWUlEQVQoz5WRwQ3AIAwDz0zRkRmVLdxPI1VpoHAvBDrLFuLFZRznIcQEVcKOCIA7dseP7CokaCGkmiURpNlDrhf3Q2i5qWIIte3RedMuEXwkff7pb9tJ/ZIbxb4jzL1bE3wAAAAASUVORK5CYII=';
const duckClosed = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAVklEQVQoz6WRSw6AMAhEH5yiR+5Re4txIwka1LbOik8eGQA2ZDlpQhEPu/ZKKAMzIADqSB2dsKohUfMAbk2egE97lYZhPu0/yVdOHYP995/edluxX+oAarQf4d+S0rQAAAAASUVORK5CYII=';

// Set the initial image
function toggleDuckImage() {
  const cubeFaces = document.querySelectorAll('.cube div');
  cubeFaces.forEach(face => {
    face.style.backgroundImage = (face.style.backgroundImage === `url("${duckOpen}")`) ? `url("${duckClosed}")` : `url("${duckOpen}")`;
  });
}

setInterval(toggleDuckImage, 1000); // Toggle every second

function startDuckAnimation() {
  toggleDuckImage();
}

function resetDuckAnimation() {
  clearInterval(toggleDuckImage);
  const cubeFaces = document.querySelectorAll('.cube div');
  cubeFaces.forEach(face => {
    face.style.backgroundImage = `url("${duckClosed}")`;
  });
}

function setFontSize() {
  const fontSizeInput = document.getElementById('fontSizeInput');
  const fontSize = fontSizeInput.value.trim();
  if (fontSize !== '') {
    document.body.style.fontSize = fontSize + 'px';
    fontSizeInput.value = '';
  }
}

function toggleBold() {
  const body = document.body;
  body.style.fontWeight = (body.style.fontWeight === 'bold') ? 'normal' : 'bold';
}