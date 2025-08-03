// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const papers = Array.from(document.querySelectorAll(".paper"));

// Config
let currentLocation = 0;
const numOfPapers = papers.length;
const maxLocation = numOfPapers;

// Add event listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Open book (shifts book and buttons)
function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

// Close book (snap left or right)
function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

// Turn to next page
function goNextPage() {
    if (currentLocation < maxLocation) {
        if (currentLocation === 0) openBook();

        papers[currentLocation].classList.add("flipped");
        papers[currentLocation].style.zIndex = currentLocation + 1;

        currentLocation++;

        if (currentLocation === maxLocation) {
            closeBook(false); // fully flipped
        }
    }
}

// Turn to previous page
function goPrevPage() {
    if (currentLocation > 0) {
        if (currentLocation === maxLocation) openBook();

        currentLocation--;

        papers[currentLocation].classList.remove("flipped");
        papers[currentLocation].style.zIndex = numOfPapers - currentLocation;

        if (currentLocation === 0) {
            closeBook(true);
        }
    }
}
const gridData = [
      ["X","13","X","X","X","X","X","X","X","X","X","2","X","X","X"],
      ["X","","X","X","X","X","11","","","","","","","","4"],
      ["X","","X","10","","","","","","X","X","","X","X",""],
      ["X","","X","X","X","X","X","X","X","X","X","","X","X",""],
      ["X","","X","14","","","","","","","","","","",""],
      ["X","","X","X","X","X","X","1","","","","","12","",""],
      ["X","X","X","X","X","7,8","","","","","","X","","X",""],
      ["5,6","","","","","","","","X","X","X","X","","X",""],
      ["","X","X","X","X","","X","X","X","X","X","X","","X",""],
      ["","X","X","X","X","","X","X","X","X","15","X","X","X",""],
      ["","3","","","","","","","","","","","","",""],
      ["","X","X","X","X","","X","X","X","X","","X","X","X","X"],
      ["X","X","X","X","X","","X","X","X","X","","X","X","X","X"],
      ["X","X","X","X","X","","X","X","X","X","","X","X","X","X"],
      ["9","","","","","","","","","","","X","X","X","X"]
    ];

    function renderGrid(gridData) {
      const gridContainer = document.getElementById("grid");
      gridContainer.innerHTML = "";

      for (let row = 0; row < gridData.length; row++) {
        for (let col = 0; col < gridData[row].length; col++) {
          const content = gridData[row][col];
          const cell = document.createElement("div");
          cell.classList.add("cell");

          if (content === "X") {
            cell.classList.add("black");
          } else {
            const clue = document.createElement("div");
            clue.classList.add("clue-number");

            if (typeof content === "string" && /\d/.test(content)) {
              clue.innerText = content;
            }

            const input = document.createElement("input");
            input.maxLength = 1;
            input.dataset.row = row;
            input.dataset.col = col;

                // Load saved value from localStorage
            const saved = localStorage.getItem(`cell-${row}-${col}`);
            if (saved) input.value = saved;

            // Save value to localStorage on input
            input.addEventListener("input", () => {
              localStorage.setItem(`cell-${row}-${col}`, input.value.toUpperCase());
            });

            cell.appendChild(clue);
            cell.appendChild(input);
          }

          gridContainer.appendChild(cell);
        }
      }
    }
    
    renderGrid(gridData);

// Reset button logic
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  if (confirm("RESET ALL ANSWERS?")) {
    for (let row = 0; row < gridData.length; row++) {
      for (let col = 0; col < gridData[row].length; col++) {
        if (gridData[row][col] !== "X") {
          localStorage.removeItem(`cell-${row}-${col}`);
        }
      }
    }
    renderGrid(gridData); // Re-render the grid with cleared inputs
  }
});