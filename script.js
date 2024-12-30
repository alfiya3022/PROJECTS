let boxes = document.querySelectorAll(".box");//to work on boxes
let reset_button = document.querySelector("#reset");//work on reset button
let new_button = document.querySelector("#new");//work on new button
let msgContainer = document.querySelector(".msg-container");//to work on msg
let msg = document.querySelector("#msg");//to work on msg
//to track alternate player turn
let turnO = true;
let count = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

//we will create an event listener .event listeners are a function which will return something once an action is performed
//the below code tells us that once a box is clicked and o turn is there then print 0 and immediately disable o .then the next turn of x will come and so print x and again enable o
boxes.forEach((box) => {
  //foreach loop
  box.addEventListener("click", () => {
    //on click msg will be displayed
    console.log("box was clicked");
    if (turnO) {
      //as soon as we click if true then o else false
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //will help to click button only once.only fill in empty boxes
    count++;
   
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
//this loop will check if the patterns are matching with the win pattern array if yes then declare winner

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    ///here we make sure that no place is empty and all three position should have equal value
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

new_button.addEventListener("click", resetGame);
reset_button.addEventListener("click", resetGame);

//GAME LOGIC: IN THIS GAME FIRST WE FIND THE WINNING PATTERNS AND CREATE A 2D ARRAY.SINCE THE GAME CONSIST OF 2 PLAYERS X AND O ,WE FIRST SET THE INITIAL PLAYER TO O.HENCE 0 TURNS OCCURS.WE WANT A CONDITION THAT WHEN 1ST TIME BOX IS CLICKED WE GET 0 AND THEN WHEN 2ND TIME BOX IS CLICKED WE GET X.AFTER THE BOX IS CLICKED ONCE WE DISABLE THE BOX TO AVOID MULTIPLE CLICKS . THEN WE CHECK THE WINNER.FOR THIS WE CREATE A CHECK WINNER FUNCTION .CHECK WINNER FUNCTION WILL PROVIDE INDEX VALUE TO THR ARRAYS AND WILL SEE IF THE POS ARE SAME AMD NONE IS EMPTY.AFTER THIS WINNER HAS TO BE DISPLAYED .THEREFORE A SHOW WINNER FUNCTION IS CREATED.THIS FUNCTION WILL ACCEPT THR PARAMETER OF POS1 VALUE AND RETURN IT WHEN IT IS CALLED.ALSO IT WILL REMOVE THE HIDE MSG CLASS.TO NOT CONTINUE THE GAME FURTHER WE CREATE AN ENABLE AND DISABLE FUNCTIONS.THESE FUNCTIONS ARE USED IN RESET GAME AND NEW GAME BUTTONS.
//QUERY SELECTORS ARE USED SO THAT WE CAN WORK ON INDIVIDUAL NODES OF THE HTML FILE