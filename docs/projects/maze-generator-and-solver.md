# Maze Solver

<div id="mazeApp">
  <canvas id="myCanvas" width="800" height="600"></canvas>
</div>

  <div id="mazeControls">
    <div id="mazeSize">
      <div>
        <label for="numColumns">Columns:</label>
        <input class="md-input" type="number" id="numColumns" value="12" min="2" />
      </div>
      <div>
        <label for="numRows">Rows:</label>
        <input class="md-input" type="number" id="numRows" value="10" min="2" />
      </div>
      <div id="maze-autoSolve"><label class="task-list-control task-list-item "><input type="checkbox" checked id="autoSolve"><span class="task-list-indicator"></span></label> Auto Solve </div>
    </div>
    <div id="mazeSolve" markdown>
      <button id="mazeGenerate" class = "md-button md-button--primary">Generate</button>
      <button id="solveButton" class = "md-button md-button--primary">Solve</button>
      <button id="stopButton" class = "md-button md-button--primary">Stop</button>
      <button id="resetButton" class = "md-button md-button--primary">Reset</button>
    </div>
  </div>


<script src="gprimitives.js"></script>
<script src="maze.js"></script>
<script src="main.js"></script>
<style>
    #mazeSize {
        display: inline-flex;
        /* flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 10px; */   
        padding: 5px; 
        font-weight: bold;
    }
    #mazeSize > div {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    #mazeSize input {
        width: 3.5rem;
        /* Additional styles for child inputs can go here */
    }
    #maze-autoSolve {
      margin-left: 2rem;
    }
    #mazeSolve > button {
      /* padding: 5px; */
      /* margin-left: 2rem; */
      margin-left: 0.25rem;
    }
</style>
