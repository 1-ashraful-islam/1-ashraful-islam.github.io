---
title: Maze Generator and Solver
date: 2024-01-20
tags:
  - Python
  - Python Tkinter
  - JavaScript
  - HTML5
  - HTML5 Canvas
---

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
    @media (max-width: 600px) {
        #mazeSize {
            padding: 2px; 
            font-weight: bold;
        }
        #mazeSize > div {
            padding-left: 2px;
            padding-right: 2px;
        }
        #mazeSize input {
            width: 3rem;
        }
        #maze-autoSolve {
            margin-left: 1.2rem;
        }
        #mazeSolve > button {
            margin-left: 0.05rem;
            padding-left: 0.25rem;
            padding-right: 0.25rem;
        }
        #mazeSolve > {
            display: inline-block;
        }
    }
</style>

Check the source code in [:material-github: github repo](https://github.com/1-ashraful-islam/boot.dev-projects).

## Project Description

The objective of the project is to create a maze and solve it. This is a semi-guided project from boot.dev backend developer course. Although the original project was to create the maze using Python and Tkinter - after I created the python version, I converted the python codes to javascript and HTML5 using GPT-4's assistance so that it can also run in the browser. Code for both versions are available in the [github repo](https://github.com/1-ashraful-islam/boot.dev-projects).

## Project Impact and Learning outcomes

This project was fun and I learned a lot in the process. This was the first time I have used Tkinter. I learned how to use the GUI library to create a simple interactive application using python. Afterwards, as I converted the python codes to javascript, I learned how to use HTML5 canvas to create a similar interactive application that can run in the browser. Since my javascript is rusty, I also learned a lot about javascript programming in the process. Having GPT-4 as assistant definitely helped a great deal in the conversion process.

## Challenges and Solutions

The order of directions chosen during depth first algorithm can change how many steps are required to solve the maze based on where the "start" and "finish" are located. Original project uses the top-left cell as start and bottom-left as end. This means if you select the order "bottom, right, left, up" for the directions, the maze will be solved in the least number of steps. These steps can be reordered to make a very inefficient solving algorithm.

To make things interesting for the depth first algorithm, I added randomness so that "start" is slected to be anywhere on the perimeter of the maze and "finish" is selected to be anywhere on the perimter that is at least number of (cell+row)/2 away. Press reset and generate the maze a few times to see this in action!
  
## Future Extensions

- [x] Add emojis to make it more exciting
- [ ] Add a counter to see how many steps it took to solve the maze
- [ ] Add options to change the order of directions chosen during depth first algorithm
- [ ] Add breadth first and A* search algorithms to solve the maze
