const maze_canvas = document.getElementById('myCanvas');
const maze_ctx = maze_canvas.getContext('2d');

class MazeWindow {
  constructor(width, height, background = "#ccc") {
    this.width = width;
    this.height = height;
    this.background = background;
    this.canvas = maze_canvas;
    this.ctx = maze_ctx;
    
    this.canvas.style.background = this.background;
    this.isRunning = false;
    this.createButtons();
    this.autoSolve = true; //true by default

    // Parameters for maze generation

    this.mazeProcessing = false;
    
    // Initial Maze creation
    this.generateMaze();
  }

  calculate_maze_parameters() {
    this.padding = 15;
    this.seed = null;
 
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
    console.log("Calulated maze parameters: ", this.numCols, this.numRows, this.cellWidth, this.cellHeight)

  }

  createButtons() {
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => this.generateMaze());

    const stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', () => this.stop());

    const solveButton = document.getElementById('solveButton');
    solveButton.addEventListener('click', () => this.solveMaze());

    const generateButton = document.getElementById('mazeGenerate');
    generateButton.addEventListener('click', () => this.generateMaze());
    
    const autoSolveCheckbox = document.getElementById('autoSolve');
    autoSolveCheckbox.addEventListener("change", () => {
      this.autoSolve = autoSolveCheckbox.checked ? true : false;
    });
  }

  generateMaze() {
    this.stop();

    let { canvasWidth, canvasHeight } = prepare_canvas();
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.createMaze();
  }

  async createMaze() {
    
    this.calculate_maze_parameters();
    // Clear the canvas
    this.clearCanvas();


    this.mazeProcessing = true;
    // Assuming Maze is a class you have defined in maze.js
    this.maze = new Maze(this.padding, this.padding, this.numRows, this.numCols,
                         this.cellWidth, this.cellHeight, this, this.seed);
    
    await this.maze.createCells();
    
    // this.maze.solve();
    this.mazeProcessing = false;

    if (this.autoSolve) {
      this.solveMaze();
    }
  }

  solveMaze() {
    
    if (this.maze) {
      this.maze.solve();
    }

  }

  clearCanvas() {
    maze_ctx.clearRect(0, 0, maze_canvas.width, maze_canvas.height);
  }

  stop() {
    if (this.maze) {
      this.maze.stop();
      this.mazeProcessing = false;
    }
  }

  drawLine(line, fillColor = "black") {
    line.draw(maze_ctx, fillColor);
  }

  getCanvas() {
    return maze_canvas;
  }
}

function prepare_canvas() {

  // Initial resize
  maze_canvas.width = Math.min(window.innerWidth, window.innerHeight, 800) - 50;
  maze_canvas.height = maze_canvas.width * 3 / 4;
  let canvasWidth = maze_canvas.width;
  let canvasHeight = maze_canvas.height;

  return {canvasWidth, canvasHeight};
}

// Main execution
function main() {

  let { canvasWidth, canvasHeight } = prepare_canvas();
  const maze_window = new MazeWindow(canvasWidth, canvasHeight);
  maze_window.isRunning = true;
}

main();
