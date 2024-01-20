var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var maze_window = null;


class MazeWindow {
  constructor(width, height, background = "#ccc") {
    this.width = width;
    this.height = height;
    this.background = background;
    this.canvas = document.getElementById('myCanvas');
    
    this.canvas.style.background = this.background;
    this.isRunning = false;
    this.createButtons();
    this.autoSolve = true; //true by default

    // Parameters for maze generation

    this.numCols = 12;
    this.numRows = 10;


    this.padding = 50;
    this.seed = null;
    this.cellWidth = (width - 2 * this.padding) / this.numCols;
    this.cellHeight = (height - 2 * this.padding) / this.numRows;

    this.mazeProcessing = false;
    maze_window = this;
    // Initial Maze creation
    this.generateMaze();
  }

  createButtons() {
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => this.generateMaze());

    const stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', () => this.stop());

    const solveButton = document.getElementById('solveButton');
    solveButton.addEventListener('click', () => this.solveMaze(solveButton));

    const generateButton = document.getElementById('mazeGenerate');
    generateButton.addEventListener('click', () => this.generateMaze());
    
    const autoSolveCheckbox = document.getElementById('autoSolve');
    autoSolveCheckbox.addEventListener("change", () => {
      this.autoSolve = autoSolveCheckbox.checked ? true : false;
    });
  }

  generateMaze() {

    this.width = this.canvas.getAttribute('width');
    this.height = this.canvas.getAttribute('height');
    this.stop();
    const numColumnsInput = document.getElementById('numColumns');
    const numRowsInput = document.getElementById('numRows');
    this.numCols = parseInt(numColumnsInput.value) || 12; // default value of 12 if not retrieved
    this.numRows = parseInt(numRowsInput.value) || 10; // default value of 10 if not retrieved
    if (this.numCols < 2 || this.numCols > 16 || this.numRows < 2 || this.numRows > 16 || isNaN(this.numCols) || isNaN(this.numRows)) {
      alert("Invalid number of rows or columns. Use 2-16 columns and 2-16 rows.");
      return;
    }
    this.cellWidth = (this.width - 2 * this.padding) / this.numCols;
    this.cellHeight = (this.height - 2 * this.padding) / this.numRows;
    this.createMaze();
  }

  async createMaze() {
    

    if (this.mazeProcessing) {
      this.mazeProcessing = false;
      this.maze.stop();
    }
    // Clear the canvas
    this.clearCanvas();

    // disable solve button
    const solveButton = document.getElementById('solveButton');
    solveButton.disabled = true;
    solveButton.innerHTML = "Solve (wait...)";

    this.mazeProcessing = true;
    // Assuming Maze is a class you have defined in maze.js
    this.maze = new Maze(this.padding, this.padding, this.numRows, this.numCols,
                         this.cellWidth, this.cellHeight, this, this.seed);
    
    await this.maze.createCells();

    // enable solve button
    solveButton.disabled = false;
    solveButton.innerHTML = "Solve";
  
    // this.maze.solve();
    this.mazeProcessing = false;

    if (this.autoSolve) {
      this.solveMaze(solveButton);
    }
  }

  solveMaze(solveButton) {
    solveButton.disabled = true;
    solveButton.innerHTML = "Solving...";
    this.maze.solve();
    solveButton.disabled = false;
    solveButton.innerHTML = "Solve";
  }

  clearCanvas() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  stop() {
    if (this.mazeProcessing) {
      this.maze.stop();
      this.mazeProcessing = false;
    }
  }

  drawLine(line, fillColor = "black") {
    line.draw(this.canvas.getContext('2d'), fillColor);
  }

  getCanvas() {
    return this.canvas;
  }
}
function resizeCanvas() {
  const canvas = document.getElementById('myCanvas');
  const windowNewWidth = window.innerWidth;
  const windowNewHeight = window.innerHeight;
  if (windowNewWidth == windowWidth && windowNewHeight == windowHeight) {
    return;
  }

  maze_window.stop();


  windowWidth = windowNewWidth;
  windowHeight = windowNewHeight;
  // Save the current canvas content as an image
  // var imageData = canvas.toDataURL();

  // Resize the canvas
  canvas.width = Math.min(windowWidth, windowHeight, 800) - 50;
  canvas.height = canvas.width * 3 / 4;


  // Get the 2D context of the canvas
  var ctx = canvas.getContext('2d');
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set the font size and style
  ctx.font = '20px Arial';

  // Set the text alignment to center
  ctx.textAlign = 'center';

  // Set the fill color
  ctx.fillStyle = 'black';

  // Display the text in the middle of the canvas
  ctx.fillText('Window was resized!', canvas.width / 2, canvas.height / 2 - 20);

  ctx.fillText('Press generate to start maze again!', canvas.width / 2, canvas.height / 2 + 20);
  
}

// Main execution
function main() {
  window.addEventListener('resize', resizeCanvas, false);

  const canvas = document.getElementById('myCanvas');
  // Initial resize
  canvas.width = Math.min(windowWidth, windowHeight, 800) - 50;
  canvas.height = canvas.width * 3 / 4;

  const width = window.innerWidth - 50;
  const height = width*3/4;
  const maze_window = new MazeWindow(width, height);
  maze_window.isRunning = true;
}

main();
