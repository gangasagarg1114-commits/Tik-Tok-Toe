/* ===========================
   Tic Tac Toe Pro - PvP & Unbeatable AI (Minimax)
=========================== */

// DOM ELEMENTS SELECTION
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".New");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnDisplay = document.querySelector("#turn");
let oScoreText = document.querySelector("#oScore");
let xScoreText = document.querySelector("#xScore");
let drawScoreText = document.querySelector("#drawScore");

const pvpBtn = document.querySelector("#pvpMode");
const aiBtn = document.querySelector("#aiMode");

// GAME STATE VARIABLES
let turnO = true;
let count = 0;
let gameOver = false;
let aiEnabled = false;

let oScore = 0;
let xScore = 0;
let drawScore = 0;

// WINNING COMBINATIONS PATTERNS
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// DISABLE ALL BOXES (When game ends)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// ENABLE & CLEAR ALL BOXES (On Game Reset)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
        box.style.color = "";
    }
};

// RESET GAME FUNCTION
const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;

    enableBoxes();
    msgContainer.classList.add("hide");

    if (turnDisplay) {
        turnDisplay.innerText = aiEnabled
            ? "Your Turn (O)"
            : "Current Turn : O";
    }
};

// GET CURRENT BOARD STATE AS AN ARRAY
function getBoard() {
    return [...boxes].map(box => box.innerText);
}

// CHECK IF A SPECIFIC PLAYER HAS WON
function checkWin(board, player) {
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

// MINIMAX ALGORITHM FOR UNBEATABLE AI
function minimax(board, isMaximizing) {
    if (checkWin(board, "X")) return 10;
    if (checkWin(board, "O")) return -10;
    if (!board.includes("")) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }

    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, true);
            board[i] = "";
            bestScore = Math.min(score, bestScore);
        }
    }
    return bestScore;
}

// FIND THE BEST MOVE FOR AI USING MINIMAX
function bestMove() {
    let board = getBoard();
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "X";
            let score = minimax(board, false);
            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

// EXECUTE AI MOVE
function aiMove() {
    if (gameOver) return;

    let move = bestMove();
    if (move === undefined) return;

    boxes[move].innerText = "X";
    boxes[move].style.color = "#ff5252";
    boxes[move].disabled = true;

    count++;
    checkWinner();

    turnO = true;
    if (!gameOver && turnDisplay) {
        turnDisplay.innerText = "Your Turn (O)";
    }
}

// SHOW WINNER & HIGHLIGHT WINNING PATTERN
const showWinner = (winner, pattern) => {
    gameOver = true;

    pattern.forEach((index) => {
        boxes[index].style.backgroundColor = "#4caf50";
    });

    if (winner === "O") {
        oScore++;
        if (oScoreText) oScoreText.innerText = oScore;
    } else {
        xScore++;
        if (xScoreText) xScoreText.innerText = xScore;
    }

    msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    disableBoxes();
};

// CHECK WINNER OR DRAW AFTER EVERY MOVE
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                winnerFound = true;
                showWinner(pos1Val, pattern);
                return;
            }
        }
    }

    if (count === 9 && !winnerFound) {
        gameOver = true;
        drawScore++;

        if (drawScoreText) {
            drawScoreText.innerText = drawScore;
        }

        msg.innerText = "🤝 Match Draw!";
        msgContainer.classList.remove("hide");
    }
};

// BOX CLICK EVENT HANDLER (Handles both PvP & AI Mode)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver) return;

        // AI MODE
        if (aiEnabled) {
            if (!turnO) return;

            box.innerText = "O";
            box.style.color = "#00bcd4";
            box.disabled = true;

            count++;
            checkWinner();

            if (gameOver) return;

            turnO = false;
            if (turnDisplay) {
                turnDisplay.innerText = "🤖 AI Thinking...";
            }

            setTimeout(aiMove, 500);
        }
        // PVP MODE
        else {
            if (turnO) {
                box.innerText = "O";
                box.style.color = "#00bcd4";
                turnO = false;
                if (turnDisplay) {
                    turnDisplay.innerText = "Current Turn : X";
                }
            } else {
                box.innerText = "X";
                box.style.color = "#ff5252";
                turnO = true;
                if (turnDisplay) {
                    turnDisplay.innerText = "Current Turn : O";
                }
            }

            box.disabled = true;
            count++;
            checkWinner();
        }
    });
});

// MODE SELECTION & RESET BUTTON LISTENERS
pvpBtn?.addEventListener("click", () => {
    aiEnabled = false;
    resetGame();
});

aiBtn?.addEventListener("click", () => {
    aiEnabled = true;
    resetGame();
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);