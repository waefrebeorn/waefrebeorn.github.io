function setFontSize() {
  const fontSizeInput = document.getElementById('fontSizeInput').value;
  document.body.style.fontSize = fontSizeInput + 'px';
}

function toggleBold() {
  document.body.style.fontWeight = document.body.style.fontWeight === 'bold' ? 'normal' : 'bold';
}

function startDuckAnimation() {
  const cube = document.getElementById('duckCube');
  cube.style.animation = 'rotateCube 10s infinite linear';
}

function resetDuckAnimation() {
  const cube = document.getElementById('duckCube');
  cube.style.animation = 'none';
}
