document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll("td[class^='available-']");

  const stats = document.createElement("div");
  stats.id = "stats";
  stats.style.textAlign = "center";
  stats.style.marginTop = "20px";
  stats.style.fontSize = "1.2rem";
  stats.style.fontWeight = "bold";

  document.body.appendChild(stats);

  let totalAvailability = 0;

  cells.forEach(cell => {
    const level = Number(
      [...cell.classList]
        .find(c => c.startsWith("available-"))
        .split("-")[1]
    );

    totalAvailability += level;

    cell.title = `${level} people available`;

    cell.addEventListener("mouseenter", () => {
      cell.style.transform = "scale(1.1)";
      cell.style.transition = "0.2s";
      cell.style.boxShadow = "0 0 10px rgba(0,0,0,0.4)";
    });

    cell.addEventListener("mouseleave", () => {
      cell.style.transform = "scale(1)";
      cell.style.boxShadow = "none";
    });

    cell.addEventListener("click", () => {
      document
        .querySelectorAll(".selected-cell")
        .forEach(el => el.classList.remove("selected-cell"));

      cell.classList.add("selected-cell");

      stats.textContent =
        `Selected Time Slot: Availability Level ${level}/5`;
    });
  });

  const average = (totalAvailability / cells.length).toFixed(1);

  const summary = document.createElement("p");
  summary.style.textAlign = "center";
  summary.style.fontSize = "1rem";
  summary.textContent =
    `Average Availability: ${average}/5`;

  document.body.appendChild(summary);

  const style = document.createElement("style");
  style.textContent = `
    .selected-cell {
      outline: 4px solid #000;
      outline-offset: -4px;
    }
  `;
  document.head.appendChild(style);
});
