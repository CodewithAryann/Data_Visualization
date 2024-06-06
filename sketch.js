let data;
let activities = [];
let hours = [];
let colors = [];
let angles = [];
let animatedAngles = [];

function preload() {
  data = loadTable("Data.csv", "csv", "header");
}

function setup() {
  createCanvas(600, 600); // Reduced canvas size for a smaller pie chart
  noStroke();
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);

  // Initialize activities and hours arrays
  for (let i = 0; i < data.getRowCount(); i++) {
    let activity = data.getString(i, 0);
    let hour = data.getNum(i, 1);
    if (activity === "Exercise" || activity === "Commuting") {
      
      activities.unshift(activity);
      hours.unshift(hour);
    } else {
      // Add other activities to the end of the arrays
      activities.push(activity);
      hours.push(hour);
    }
    colors.push(color(random(360), 80, 80));
  }

  let totalHours = hours.reduce((a, b) => a + b, 0);

  // Calculate angles for each activity
  for (let i = 0; i < hours.length; i++) {
    let angle = map(hours[i], 0, totalHours, 0, 360);
    angles.push(angle);
    animatedAngles.push(0); // Initialize animated angles to 0
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  let radius = min(width, height) * 0.3; // Reduced radius for a smaller pie chart

  let lastAngle = 0;
  for (let i = 0; i < angles.length; i++) {
    fill(colors[i]);
    let currentAngle = map(animatedAngles[i], 0, 100, 0, angles[i]);
    arc(0, 0, radius * 2, radius * 2, lastAngle, lastAngle + currentAngle, PIE);

    let labelAngle = lastAngle + (currentAngle / 2);
    let labelX = cos(labelAngle) * (radius * 0.8);
    let labelY = sin(labelAngle) * (radius * 0.8);
    textAlign(CENTER, CENTER);
    fill(0);
    let percentage = (currentAngle / 360) * 100;
    text(`${activities[i]} (${percentage.toFixed(1)}%)`, labelX, labelY);

    lastAngle += angles[i];
  }

  // Increment animated angles
  for (let i = 0; i < animatedAngles.length; i++) {
    if (animatedAngles[i] < 100) {
      animatedAngles[i] += 1; // Increase animated angle by 1
    }
  }
}
