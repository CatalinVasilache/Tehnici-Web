var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
    
  };

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send();
  pageCounter++;
  if (pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  var htmlString = "";

  for (i = 0; i < data.length; i++) {
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
    
    for (ii = 0; ii < data[i].foods.likes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += " and " + data[i].foods.likes[ii];
      }
    }

    htmlString += ' and dislikes ';

    for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += " and " + data[i].foods.dislikes[ii];
      }
    }

    htmlString += '.</p>';

  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}





	//Manipulare DOM (creare, editare, stergere)
	var rIndex,
                table = document.getElementById("table");
            
            function checkEmptyInput()
            {
                var isEmpty = false,
                    fname = document.getElementById("fname").value,
                    lname = document.getElementById("lname").value,
                    age = document.getElementById("age").value;
            
                if(fname === ""){
                    alert("First Name Connot Be Empty");
                    isEmpty = true;
                }
                else if(lname === ""){
                    alert("Last Name Connot Be Empty");
                    isEmpty = true;
                }
                else if(age === ""){
                    alert("Age Connot Be Empty");
                    isEmpty = true;
                }
                return isEmpty;
            }
            
            function addHtmlTableRow()
            {

                if(!checkEmptyInput()){
                var newRow = table.insertRow(table.length),
                    cell1 = newRow.insertCell(0),
                    cell2 = newRow.insertCell(1),
                    cell3 = newRow.insertCell(2),
                    fname = document.getElementById("fname").value,
                    lname = document.getElementById("lname").value,
                    age = document.getElementById("age").value;
            
                cell1.innerHTML = fname;
                cell2.innerHTML = lname;
                cell3.innerHTML = age;
                selectedRowToInput();
            }
            }
            
            function selectedRowToInput()
            {
                
                for(var i = 1; i < table.rows.length; i++)
                {
                    table.rows[i].onclick = function()
                    {
                      rIndex = this.rowIndex;
                      document.getElementById("fname").value = this.cells[0].innerHTML;
                      document.getElementById("lname").value = this.cells[1].innerHTML;
                      document.getElementById("age").value = this.cells[2].innerHTML;
                    };
                }
            }
            selectedRowToInput();
            
            function editHtmlTbleSelectedRow()
            {
                var fname = document.getElementById("fname").value,
                    lname = document.getElementById("lname").value,
                    age = document.getElementById("age").value;
               if(!checkEmptyInput()){
                table.rows[rIndex].cells[0].innerHTML = fname;
                table.rows[rIndex].cells[1].innerHTML = lname;
                table.rows[rIndex].cells[2].innerHTML = age;
              }
            }
            
            function removeSelectedRow()
            {
                table.deleteRow(rIndex);
                document.getElementById("fname").value = "";
                document.getElementById("lname").value = "";
                document.getElementById("age").value = "";
            }



	//Play.html page - Game
	var canvas = document.getElementById("myCanvas"); //DOM
	var ctx = canvas.getContext("2d"); 
	var ballRadius = 10;
	var x = canvas.width/2;
	var y = canvas.height-30;
	var dx = 2;
	var dy = -2;
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width-paddleWidth)/2;
	var rightPressed = false;
	var leftPressed = false;
	var brickRowCount = 5;
	var brickColumnCount = 3;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	var score = 0;
	var lives = 10;

	var bricks = [];
	for(var c=0; c<brickColumnCount; c++) {
	  bricks[c] = [];
	  for(var r=0; r<brickRowCount; r++) {
	    bricks[c][r] = { x: 0, y: 0, status: 1 };
	  }
	}

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("mousemove", mouseMoveHandler, false);

	function keyDownHandler(e) {
	    if(e.key == "Right" || e.key == "ArrowRight") {
	        rightPressed = true;
	    }
	    else if(e.key == "Left" || e.key == "ArrowLeft") {
	        leftPressed = true;
	    }
	}

	function keyUpHandler(e) {
	    if(e.key == "Right" || e.key == "ArrowRight") {
	        rightPressed = false;
	    }
	    else if(e.key == "Left" || e.key == "ArrowLeft") {
	        leftPressed = false;
	    }
	}

	function mouseMoveHandler(e) {
	  var relativeX = e.clientX - canvas.offsetLeft;
	  if(relativeX > 0 && relativeX < canvas.width) {
	    paddleX = relativeX - paddleWidth/2;
	  }
	}
	function collisionDetection() {
	  for(var c=0; c<brickColumnCount; c++) {
	    for(var r=0; r<brickRowCount; r++) {
	      var b = bricks[c][r];
	      if(b.status == 1) {
	        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
	          dy = -dy;
	          b.status = 0;
	          score++;
	          if(score == brickRowCount*brickColumnCount) {
	            alert("YOU WIN, CONGRATS!");
	            document.location.reload();
	          }
	        }
	      }
	    }
	  }
	}

	function drawBall() {
	  ctx.beginPath();
	  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	  ctx.fillStyle = "#C4C0BF";
	  ctx.fill();
	  ctx.closePath();
	}
	function drawPaddle() {
	  ctx.beginPath();
	  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	  ctx.fillStyle = "#EC3049";
	  ctx.fill();
	  ctx.closePath();
	}
	function drawBricks() {
	  for(var c=0; c<brickColumnCount; c++) {
	    for(var r=0; r<brickRowCount; r++) {
	      if(bricks[c][r].status == 1) {
	        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
	        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
	        bricks[c][r].x = brickX;
	        bricks[c][r].y = brickY;
	        ctx.beginPath();
	        ctx.rect(brickX, brickY, brickWidth, brickHeight);
	        ctx.fillStyle = "#EC3049";
	        ctx.fill();
	        ctx.closePath();
	      }
	    }
	  }
	}
	function drawScore() {
	  ctx.font = "16px Arial";
	  ctx.fillStyle = "#EC3049";
	  ctx.fillText("Score: "+score, 8, 20);
	}
	function drawLives() {
	  ctx.font = "16px Arial";
	  ctx.fillStyle = "#EC3049";
	  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	}

	function draw() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  drawBricks();
	  drawBall();
	  drawPaddle();
	  drawScore();
	  drawLives();
	  collisionDetection();

	  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
	    dx = -dx;
	  }
	  if(y + dy < ballRadius) {
	    dy = -dy;
	  }
	  else if(y + dy > canvas.height-ballRadius) {
	    if(x > paddleX && x < paddleX + paddleWidth) {
	      dy = -dy;
	    }
	    else {
	      lives--;
	      if(!lives) {
	        alert("GAME OVER");
	        document.location.reload();
	      }
	      else {
	        x = canvas.width/2;
	        y = canvas.height-30;
	        dx = 3;
	        dy = -3;
	        paddleX = (canvas.width-paddleWidth)/2;
	      }
	    }
	  }

	  if(rightPressed && paddleX < canvas.width-paddleWidth) {
	    paddleX += 7;
	  }
	  else if(leftPressed && paddleX > 0) {
	    paddleX -= 7;
	  }

	  x += dx;
	  y += dy;
	  requestAnimationFrame(draw);
	}

	draw();




