// Base64 data for the duck images
const duckOpen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAWUlEQVQoz5WRwQ3AIAwDz0zRkRmVLdxPI1VpoHAvBDrLFuLFZRznIcQEVcKOCIA7dseP7CokaCGkmiURpNlDrhf3Q2i5qWIIte3RedMuEXwkff7pb9tJ/ZIbxb4jzL1bE3wAAAAASUVORK5CYII=';
const duckClosed = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAVklEQVQoz6WRSw6AMAhEH5yiR+5Re4txIwka1LbOik8eGQA2ZDlpQhEPu/ZKKAMzIADqSB2dsKohUfMAbk2egE97lYZhPu0/yVdOHYP995/edluxX+oAarQf4d+S0rQAAAAASUVORK5CYII=';

// Set the initial image
document.getElementById('duckImage').src = duckOpen;

document.getElementById('toggleDuckButton').addEventListener('click', () => {
  const duckImage = document.getElementById('duckImage');
  if (duckImage.src === duckOpen) {
    duckImage.src = duckClosed;
  } else {
    duckImage.src = duckOpen;
  }
});
