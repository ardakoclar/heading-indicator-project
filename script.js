document.addEventListener("DOMContentLoaded", function () {
  const headingSlider = document.getElementById("headingSlider");
  const headingValue = document.getElementById("headingValue");
  const headingWindow = document.getElementById("headingWindow");
  const headingCard = document.getElementById("headingCard");
  const greenModeBtn = document.getElementById("greenModeBtn");
  const demoBtn = document.getElementById("demoBtn");
  const failBtn = document.getElementById("failBtn");
  const warningBox = document.getElementById("warningBox");
  const instrument = document.getElementById("instrument");

  let isFailed = false;
  let demoInterval = null;
  let demoRunning = false;

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
      mark.style.transform = `translate(-50%, -50%) rotate(${i}deg)`;
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

    if (!isFailed) {
      headingCard.style.transform = `rotate(${-heading}deg)`;
    }
  }

  function toggleGreenMode() {
    document.body.classList.toggle("green-mode");
    greenModeBtn.textContent = document.body.classList.contains("green-mode")
      ? "Green Mode: ON"
      : "Green Mode: OFF";
  }

  function toggleFailure() {
    isFailed = !isFailed;

    if (isFailed) {
      warningBox.classList.remove("hidden");
      instrument.classList.add("failed");
      failBtn.textContent = "Recover Instrument";
    } else {
      warningBox.classList.add("hidden");
      instrument.classList.remove("failed");
      failBtn.textContent = "Trigger Failure";
      updateHeading();
    }
  }

  function toggleDemoFlight() {
    if (demoRunning) {
      clearInterval(demoInterval);
      demoInterval = null;
      demoRunning = false;
      demoBtn.textContent = "Start Demo Flight";
      return;
    }

    const demoSequence = [
      0, 15, 30, 45, 60, 90, 120, 150, 180,
      210, 240, 270, 300, 330, 359, 330, 300,
      270, 240, 210, 180, 150, 120, 90, 60, 30, 0
    ];

    let index = 0;
    demoRunning = true;
    demoBtn.textContent = "Stop Demo Flight";

    demoInterval = setInterval(() => {
      if (index >= demoSequence.length) {
        clearInterval(demoInterval);
        demoInterval = null;
        demoRunning = false;
        demoBtn.textContent = "Start Demo Flight";
        return;
      }

      headingSlider.value = demoSequence[index];
      updateHeading();
      index++;
    }, 500);
  }

  createMarks();
  updateHeading();

  headingSlider.addEventListener("input", updateHeading);
  greenModeBtn.addEventListener("click", toggleGreenMode);
  demoBtn.addEventListener("click", toggleDemoFlight);
  failBtn.addEventListener("click", toggleFailure);

  window.addEventListener("resize", function () {
    createMarks();
    updateHeading();
  });
});