document.addEventListener("DOMContentLoaded", function () {
  const headingSlider = document.getElementById("headingSlider");
  const headingValue = document.getElementById("headingValue");
  const headingWindow = document.getElementById("headingWindow");
  const headingCard = document.getElementById("headingCard");
  const greenModeBtn = document.getElementById("greenModeBtn");

  function createMarks() {
    headingCard.innerHTML = "";

    const size = headingCard.clientWidth;
    const center = size / 2;
    const markRadius = size * 0.44;
    const labelRadius = size * 0.36;

    for (let i = 0; i < 360; i += 10) {
      const angle = (i - 90) * (Math.PI / 180);
      const isMajor = i % 30 === 0;

      const markX = center + Math.cos(angle) * markRadius;
      const markY = center + Math.sin(angle) * markRadius;

      const mark = document.createElement("div");
      mark.className = isMajor ? "mark-line major-mark" : "mark-line minor-mark";
      mark.style.left = markX + "px";
      mark.style.top = markY + "px";
      mark.style.transform = "translate(-50%, -50%) rotate(" + i + "deg)";
      headingCard.appendChild(mark);

      if (isMajor) {
        const label = document.createElement("div");
        const labelX = center + Math.cos(angle) * labelRadius;
        const labelY = center + Math.sin(angle) * labelRadius;

        if (i === 0 || i === 90 || i === 180 || i === 270) {
          label.className = "mark-label cardinal-label";
        } else {
          label.className = "mark-label degree-number";
        }

        if (i === 0) label.textContent = "N";
        else if (i === 90) label.textContent = "E";
        else if (i === 180) label.textContent = "S";
        else if (i === 270) label.textContent = "W";
        else label.textContent = i;

        label.style.left = labelX + "px";
        label.style.top = labelY + "px";

        headingCard.appendChild(label);
      }
    }

    const centerRing = document.createElement("div");
    centerRing.className = "center-ring";
    headingCard.appendChild(centerRing);
  }

  function updateHeading() {
    const heading = Number(headingSlider.value);
    headingValue.textContent = heading;
    headingWindow.textContent = String(heading).padStart(3, "0");
    headingCard.style.transform = "rotate(" + (-heading) + "deg)";
  }

  function toggleGreenMode() {
    document.body.classList.toggle("green-mode");

    if (document.body.classList.contains("green-mode")) {
      greenModeBtn.textContent = "Green Mode: ON";
    } else {
      greenModeBtn.textContent = "Green Mode: OFF";
    }
  }

  createMarks();
  updateHeading();

  headingSlider.addEventListener("input", updateHeading);
  greenModeBtn.addEventListener("click", toggleGreenMode);

  window.addEventListener("resize", function () {
    createMarks();
    updateHeading();
  });
});