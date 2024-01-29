---
title: Pong Wars - Yin Yang Edition
---
<!-- # Pong Wars - Yin Yang Edition -->
<style>
      /* html {
        height: 100%;
      } */

      /* body {
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to bottom, #172b36 0%, #d9e8e3 100%);
      } */

      #container {
        display: flex;
        width: 100%;
        max-width: 650px;
        align-items: center;
        flex-direction: column;
        height: width;
        background: linear-gradient(to bottom, #172b36 0%, #d9e8e3 100%);
      }

      #pongCanvas {
        display: block;
        border-radius: 4px;
        overflow: hidden;
        width: 100%;
        max-width: 450px;
        margin-top: auto;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      }

      #score {
        font-family: monospace;
        margin-top: 30px;
        font-size: 20px;
        padding-left: 20px;
        color: #172b36;
      }

      #made {
        font-family: monospace;
        margin-top: auto;
        margin-bottom: 20px;
        font-size: 12px;
        padding-left: 20px;
        color: #172b36;
      }

      #made a {
        color: #172b36;
      }
    </style>
  </head>

  <div >
    <div id="container">
      <h1> Pong Wars - Yin Yang Edition </h1>
      <canvas id="pongCanvas" width="800" height="800"></canvas>
      <div id="score"></div>
      <p id="made">
        made by <a href="https://1-ashraful-islam.github.io">Ashraful Islam</a>  (source :
        <a href="https://github.com/1-ashraful-islam/weekend-projects/tree/main/pong-wars">github)</a>
        ||| Original: <a href="https://koenvangilst.nl">Koen van Gilst</a>  (source :
        <a href="https://github.com/vnglst/pong-wars">github)</a>
      </p>
      
    </div>
  </div>

  <script>
    // Source palette: https://twitter.com/AlexCristache/status/1738610343499157872
    const colorPalette = {
      ArcticPowder: "#F1F6F4",
      MysticMint: "#D9E8E3",
      Forsythia: "#FFC801",
      DeepSaffron: "#FF9932",
      NocturnalExpedition: "#114C5A",
      OceanicNoir: "#172B36",
    };
    

    // Idea for Pong wars: https://twitter.com/nicolasdnl/status/1749715070928433161

    const canvas = document.getElementById("pongCanvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");

    const TEAM1 = "white"; //colorPalette.MysticMint;
    const TEAM1_BALL = "black"; //colorPalette.NocturnalExpedition;

    const TEAM2 = "black"; //colorPalette.NocturnalExpedition;
    const TEAM2_BALL = "white"; //colorPalette.MysticMint;

    const squareSize = 20;
    const ballSize = 60;
    const baseSpeed = 16;
    const numSquaresX = canvas.width / squareSize;
    const numSquaresY = canvas.height / squareSize;
    let squares = [];

    for (let i = 0; i < numSquaresX; i++) {
      squares[i] = [];
      for (let j = 0; j < numSquaresY; j++) {
        squares[i][j] = i < numSquaresX / 2 ? TEAM1 : TEAM2;
      }
    }

    let x1 = canvas.width / 4;
    let y1 = canvas.height / 2;
    let dx1 = baseSpeed;
    let dy1 = baseSpeed;

    let x2 = (canvas.width / 4) * 3;
    let y2 = canvas.height / 2;
    let dx2 = -baseSpeed;
    let dy2 = -baseSpeed;

    function drawBall(x, y, color) {
      ctx.beginPath();
      ctx.arc(x, y, ballSize, 0, Math.PI * 2, false);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }

    function drawSquares() {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 2;

      for (let i = 0; i < numSquaresX; i++) {
          for (let j = 0; j < numSquaresY; j++) {
              const squareLeft = i * squareSize;
              const squareTop = j * squareSize;
              const corners = [
                  {x: squareLeft, y: squareTop},
                  {x: squareLeft + squareSize, y: squareTop},
                  {x: squareLeft, y: squareTop + squareSize},
                  {x: squareLeft + squareSize, y: squareTop + squareSize}
              ];
              const withinCircle = corners.some(corner => {
                  const distanceFromCenter = Math.sqrt(
                      Math.pow(corner.x - centerX, 2) + Math.pow(corner.y - centerY, 2)
                  );
                  return distanceFromCenter <= radius;
              });

              if (withinCircle) {
                  ctx.fillStyle = squares[i][j];
                  ctx.fillRect(squareLeft, squareTop, squareSize, squareSize);
              }
          }
      }
    }

    function randomNum(min, max) {
      return Math.random() * (max - min) + min;
    }

    function updateSquareAndBounce(x, y, dx, dy, color) {
      let updatedDx = dx;
      let updatedDy = dy;

      // Check multiple points around the ball's circumference
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / (ballSize * 2)) {
        let checkX = x + Math.cos(angle) * (ballSize);
        let checkY = y + Math.sin(angle) * (ballSize);

        let i = Math.floor(checkX / squareSize);
        let j = Math.floor(checkY / squareSize);

        if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
          if (squares[i][j] !== color) {
            squares[i][j] = color;

            // // Determine bounce direction based on the angle
            // if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
            //   updatedDx = -updatedDx;
            // } else {
            //   updatedDy = -updatedDy;
            // }
            let normal = { dx: Math.cos(angle), dy: Math.sin(angle) };
            let reflectedVelocity = reflect({ dx: dx, dy: dy }, normal);
            updatedDx = reflectedVelocity.dx;
            updatedDy = reflectedVelocity.dy;


            // updatedDx += randomNum(-0.15, 0.15);
            // updatedDy += randomNum(-0.15, 0.15);
          }
        }
      }

      return { dx: updatedDx, dy: updatedDy };
    }

    function updateScoreElement() {
      let team1Score = 0;
      let team2Score = 0;
      for (let i = 0; i < numSquaresX; i++) {
        for (let j = 0; j < numSquaresY; j++) {
          if (squares[i][j] === TEAM1) {
            team1Score++;
          } else if (squares[i][j] === TEAM2) {
            team2Score++;
          }
        }
      }

      scoreElement.textContent = `yin ${team2Score} | yang ${team1Score}`;
    }
    function reflect(velocity, normal) {
      let dotProduct = velocity.dx * normal.dx + velocity.dy * normal.dy;
      let newDx = velocity.dx - 2 * dotProduct * normal.dx;
      let newDy = velocity.dy - 2 * dotProduct * normal.dy;
      return {
        dx: newDx,
        dy: newDy
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSquares();

      drawBall(x1, y1, TEAM1_BALL);
      let bounce1 = updateSquareAndBounce(x1, y1, dx1, dy1, TEAM1);
      dx1 = bounce1.dx;
      dy1 = bounce1.dy;

      drawBall(x2, y2, TEAM2_BALL);
      let bounce2 = updateSquareAndBounce(x2, y2, dx2, dy2, TEAM2);
      dx2 = bounce2.dx;
      dy2 = bounce2.dy;

      updateScoreElement();

      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      let radius = Math.min(canvas.width, canvas.height) / 2;

      // Enhanced collision detection and handling
      [x1, y1, dx1, dy1] = handleCollision(x1, y1, dx1, dy1, centerX, centerY, radius);
      [x2, y2, dx2, dy2] = handleCollision(x2, y2, dx2, dy2, centerX, centerY, radius);

      let results = resolveBallCollision(x1, y1, dx1, dy1, x2, y2, dx2, dy2);
      x1 = results[0];
      y1 = results[1];
      dx1 = results[2];
      dy1 = results[3];
      x2 = results[4];
      y2 = results[5];
      dx2 = results[6];
      dy2 = results[7];
      x1 += dx1;
      y1 += dy1;
      x2 += dx2;
      y2 += dy2;

      

      requestAnimationFrame(draw);
    }
    function handleCollision(x, y, dx, dy, centerX, centerY, radius) {
      let distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      if (distanceFromCenter > radius - ballSize) {
        let normal = { dx: (x - centerX) / distanceFromCenter, dy: (y - centerY) / distanceFromCenter };
        let reflectedVelocity = reflect({ dx: dx, dy: dy }, normal);

        // Reposition ball just outside the circle
        let overlap = ballSize + distanceFromCenter - radius;
        x -= overlap * normal.dx;
        y -= overlap * normal.dy;

        return [x, y, reflectedVelocity.dx, reflectedVelocity.dy];
      }
      return [x, y, dx, dy];
    }
    function resolveBallCollision(x1, y1, dx1, dy1, x2, y2, dx2, dy2) {
      let distX = x1 - x2;
      let distY = y1 - y2;
      let distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < ballSize * 1.1) {
          let nx = distX / distance;
          let ny = distY / distance;

          // Resolve overlap
          let separationFactor = 1.2;  // Adjust this factor to increase separation
          let overlap = separationFactor * distance;
          x1 += overlap * nx;
          y1 += overlap * ny;
          x2 -= overlap * nx;
          y2 -= overlap * ny;

          // Reflect velocities
          let reflectedVelocity1 = reflect({ dx: dx1, dy: dy1 }, { dx: nx, dy: ny });
          let reflectedVelocity2 = reflect({ dx: dx2, dy: dy2 }, { dx: -nx, dy: -ny });

          return [x1, y1, reflectedVelocity1.dx, reflectedVelocity1.dy, x2, y2, reflectedVelocity2.dx, reflectedVelocity2.dy];
      }

      return [x1, y1, dx1, dy1, x2, y2, dx2, dy2];
    }

    requestAnimationFrame(draw);
  </script>
