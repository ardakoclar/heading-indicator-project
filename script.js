const headingSlider = document.getElementById("headingSlider");
const headingValue = document.getElementById("headingValue");
const headingCard = document.getElementById("headingCard");

const instrumentSize = 320;
const center = instrumentSize / 2;

function createMarks() {
  headingCard.innerHTML = '<div class="center-dot"></div>';

  for (let i = 0; i < 360; i += 30) {
    const angle = (i - 90) * (Math.PI / 180);

    const lineRadius = 125;
    const labelRadius = 105;

    const lineX = center + Math.cos(angle) * lineRadius;
    const lineY = center + Math.sin(angle) * lineRadius;

    const labelX = center + Math.cos(angle) * labelRadius;
    const labelY = center + Math.sin(angle) * labelRadius;

    const line = document.createElement("div");
    line.className = "mark-line";
    line.style.left = `${lineX}px`;
    line.style.top = `${lineY}px`;
    line.style.transform = `translate(-50%, -50%) rotate(${i}deg)`;
    headingCard.appendChild(line);

    const label = document.createElement("div");
    const isCardinal = i === 0 || i === 90 || i === 180 || i === 270;

    if (isCardinal) {
      label.className = "mark-label cardinal-label";
    } else {
      label.className = "mark-label degree-number";
    }

    label.style.left = `${labelX}px`;
    label.style.top = `${labelY}px`;

    if (i === 0) label.textContent = "N";
    else if (i === 90) label.textContent = "E";
    else if (i === 180) label.textContent = "S";
    else if (i === 270) label.textContent = "W";
    else label.textContent = i;

    headingCard.appendChild(label);
  }
}

function updateHeading() {
  const heading = Number(headingSlider.value);
  headingValue.textContent = heading;
  headingCard.style.transform = `rotate(${-heading}deg)`;
}

createMarks();
updateHeading();

headingSlider.addEventListener("input", updateHeading);