# Maze Solver

<div id="mazeApp">
  <canvas id="myCanvas" width="800" height="600"></canvas>
</div>

  <div id="mazeControls">
    <div id="mazeSize">
      <label for="numColumns">Columns:</label>
      <input type="number" id="numColumns" value="12" min="2" />
      <label for="numRows">Rows:</label>
      <input type="number" id="numRows" value="10" min="2" />
      <button id="mazeGenerate" class = "md-button md-button--primary">Generate</button>
    </div>
    <div id="mazeSolve" markdown>
      <span class = "md-button md-button--primary"><label class="task-list-control task-list-item "><input type="checkbox" checked id="autoSolve"><span class="task-list-indicator"></span></label> Auto Solve </span>
      <button id="solveButton" class = "md-button md-button--primary">Solve</button>
      <button id="stopButton" class = "md-button md-button--primary">Stop</button>
      <button id="resetButton" class = "md-button md-button--primary">Reset</button>
      
    </div>
  </div>


<script src="gprimitives.js"></script>
<script src="maze.js"></script>
<script src="main.js"></script>
