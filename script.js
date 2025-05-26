const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

const svg = document.getElementById("chart");
const svgWidth = parseInt(svg.getAttribute("width"));
const svgHeight = parseInt(svg.getAttribute("height"));

const blockWidth = 30;
const blockSpacing = 5;
const scale = 20;

const maxHeight = Math.max(...heights);
const n = heights.length;

const leftMax = [];
const rightMax = [];

let currentMax = 0;
for (let i = 0; i < n; i++) {
  currentMax = Math.max(currentMax, heights[i]);
  leftMax[i] = currentMax;
}

currentMax = 0;
for (let i = n - 1; i >= 0; i--) {
  currentMax = Math.max(currentMax, heights[i]);
  rightMax[i] = currentMax;
}

const water = [];
let totalWater = 0;

for (let i = 0; i < n; i++) {
  const waterLevel = Math.min(leftMax[i], rightMax[i]);
  const trapped = Math.max(0, waterLevel - heights[i]);
  water[i] = trapped;
  totalWater += trapped;
}

document.getElementById(
  "total"
).textContent = `Total Water Trapped: ${totalWater} units`;

for (let i = 0; i < n; i++) {
  const wall = heights[i];
  const waterAbove = water[i];

  for (let row = 0; row < maxHeight; row++) {
    const x = i * (blockWidth + blockSpacing);
    const y = svgHeight - (row + 1) * scale;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", blockWidth);
    rect.setAttribute("height", scale);

    if (row < wall) {
      rect.setAttribute("fill", "#333");
    } else if (row < wall + waterAbove) {
      rect.setAttribute("fill", "skyblue");
    } else {
      rect.setAttribute("fill", "#eee");
    }

    svg.appendChild(rect);
  }
}
