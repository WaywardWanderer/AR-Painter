const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to the full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to store brush position
let brushX = canvas.width / 2;
let brushY = canvas.height / 2;
let brushSize = 5;

// Clear the canvas when the "Clear" button is clicked
document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Function to draw on the canvas
function draw(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
  ctx.fillStyle = '#ff0000';
  ctx.fill();
}
// Gyroscope sensitivity
const sensitivity = 1.5;

window.addEventListener('deviceorientation', (event) => {
  const { beta, gamma } = event; // beta (tilt front-to-back), gamma (tilt left-to-right)

  // Calculate movement based on the device tilt
  const moveX = gamma * sensitivity;
  const moveY = beta * sensitivity;

  // Update brush position
  brushX = Math.min(canvas.width, Math.max(0, brushX + moveX));
  brushY = Math.min(canvas.height, Math.max(0, brushY + moveY));

  // Draw at new position
  draw(brushX, brushY);
});
